package com.example.filedrop.service.user;

import com.example.filedrop.Entity.File;
import com.example.filedrop.dto.FileDTO;
import com.example.filedrop.dto.UserDTO;
import com.example.filedrop.dto.UserLoginDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    ResponseEntity<?> addUser(UserDTO user);

    ResponseEntity<String> getUser(UserLoginDTO userLoginDTO);

    ResponseEntity<?> uploadToS3(String userName, MultipartFile file, String fileDescription);

    List<FileDTO> getAllFiles(String userName);

    ResponseEntity<?> deleteFromS3(String userName, String fileName);

    ResponseEntity<?> updateInS3(String userName, MultipartFile file, String fileName, String fileDescription);
}
