package com.example.filedrop.service.user;

import com.example.filedrop.Entity.File;
import com.example.filedrop.Entity.User;
import com.example.filedrop.config.s3.S3Buckets;
import com.example.filedrop.dto.FileDTO;
import com.example.filedrop.dto.UserDTO;
import com.example.filedrop.dto.UserLoginDTO;
import com.example.filedrop.repository.FileRepository;
import com.example.filedrop.repository.UserRepository;

import com.example.filedrop.service.AWSService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AWSService awsService;
    private final S3Buckets s3Buckets;
    private final FileRepository fileRepository;
    private static final String sns_topic_name = "**sns-topic-name**";

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, AWSService awsService, S3Buckets s3Buckets, FileRepository fileRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.awsService = awsService;
        this.s3Buckets = s3Buckets;
        this.fileRepository = fileRepository;
    }

    public ResponseEntity<?> uploadToS3(String userName, MultipartFile file, String fileDescription) {
        File file1 = fileRepository.getByFileNameAndUserName(userName,file.getOriginalFilename());
        if(file1 != null) {
            return new ResponseEntity<>("File with same name already exists",HttpStatus.BAD_REQUEST);
        }
        try {
            awsService.putObject(s3Buckets.getUser(), userName+"/"+file.getOriginalFilename(), file.getBytes());
        } catch(IOException e) {
            throw new RuntimeException(e);
        }
        File file2 = new File();
        file2.setFileId(UUID.randomUUID().toString());
        file2.setUserName(userName);
        file2.setFileDescription(fileDescription);
        file2.setFileName(file.getOriginalFilename());
        file2.setCreatedOn(Timestamp.from(Instant.now()));
        file2.setUpdatedOn(Timestamp.from(Instant.now()));
        file2.setFileURL("**cloudfront-url**"+ userName+"/"+file.getOriginalFilename());
        fileRepository.save(file2);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    public List<FileDTO> getAllFiles(String userName) {
        User user = userRepository.findByUserName(userName);
        List<File> files = new ArrayList<>();
        List<FileDTO> fileDTOS = new ArrayList<>();
        if(user.getUserRole().equals("admin")) {
            files =  fileRepository.findAll();
            fileDTOS = files.stream().map(file -> {
                User user1 = userRepository.findByUserName(file.getUserName());
                return new FileDTO(file.getFileName(),user1.getFirstName(),user1.getLastName(),user1.getUserName(),
                        file.getFileDescription(), file.getCreatedOn(),file.getUpdatedOn(), file.getFileURL());
            }).collect(Collectors.toList());
        } else {
            files =  fileRepository.findAllByUserName(userName);
            fileDTOS = files.stream().map(file -> {
                return new FileDTO(file.getFileName(),user.getFirstName(),user.getLastName(),userName,
                        file.getFileDescription(), file.getCreatedOn(),file.getUpdatedOn(), file.getFileURL());
            }).collect(Collectors.toList());
        }
        return fileDTOS;
    }

    @Override
    public ResponseEntity<?> deleteFromS3(String userName, String fileName) {
        User user = userRepository.findByUserName(userName);
        File file = fileRepository.getByFileNameAndUserName(user.getUserName(),fileName);
        awsService.deleteObject(s3Buckets.getUser(),user.getUserName()+"/"+fileName);
        fileRepository.deleteById(file.getFileId());
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @Override
    public ResponseEntity<?> updateInS3(String userName, MultipartFile file, String fileName, String fileDescription) {
        File file1 = fileRepository.getByFileNameAndUserName(userName,fileName);
        awsService.deleteObject(s3Buckets.getUser(),userName+"/"+fileName);
        try {
            awsService.putObject(s3Buckets.getUser(), userName+"/"+file.getOriginalFilename(), file.getBytes());
        } catch(IOException e) {
            throw new RuntimeException(e);
        }
        file1.setFileName(file.getOriginalFilename());
        file1.setFileDescription(fileDescription);
        file1.setUpdatedOn(Timestamp.from(Instant.now()));
        file1.setFileURL("**cloudfront-url**"+ userName+"/"+file.getOriginalFilename());
        fileRepository.save(file1);
        return new ResponseEntity<>("File updated successfully",HttpStatus.OK);
    }

    public ResponseEntity<?> addUser(UserDTO userDTO) {
        if(userRepository.existsByUserEmailOrUserName(userDTO.getUserEmail(), userDTO.getUserName())) {
            return new ResponseEntity<>("Username or Email already registered", HttpStatus.BAD_REQUEST);
        }
        User user = new User();
        user.setUserEmail(userDTO.getUserEmail());
        user.setUserName(userDTO.getUserName());
        user.setUserPassword(this.passwordEncoder.encode(userDTO.getUserPassword()));
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setUserRole("user");
        userRepository.save(user);
        awsService.createSNSSubscription(sns_topic_name,userDTO.getUserName(), userDTO.getUserEmail());
        return new ResponseEntity<>("Registration Successfull", HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<String> getUser(UserLoginDTO userLoginDTO) {
        User user = userRepository.findByUserName(userLoginDTO.getUserName());
        if(user != null && userLoginDTO.getUserRole().equals(user.getUserRole())) {
            if(passwordEncoder.matches(userLoginDTO.getUserPassword(), user.getUserPassword())) {
                return new ResponseEntity<>("Login Successfull", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Password does to match", HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
        }
    }
}
