package com.example.filedrop.controller;

import com.example.filedrop.dto.FileDTO;
import com.example.filedrop.dto.UserDTO;
import com.example.filedrop.dto.UserLoginDTO;
import com.example.filedrop.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {
        return userService.addUser(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> getUser(@RequestBody UserLoginDTO userLoginDTO) {
        return userService.getUser(userLoginDTO);
    }

    @PostMapping(
            path = "{userName}/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> uploadFileToS3Bucket(@PathVariable("userName")String userName,
                                     @RequestParam("file") MultipartFile file,
                                     @RequestParam("fileDescription") String fileDescription) {
        return userService.uploadToS3(userName,file,fileDescription);
    }

    @DeleteMapping("{userName}/{fileName}/delete")
    public ResponseEntity<?> deleteFromS3(@PathVariable("userName") String userName,
                                          @PathVariable("fileName")String fileName){
        return userService.deleteFromS3(userName, fileName);
    }

    @GetMapping("{userName}/files")
    public List<FileDTO> getAllFilesForUser(@PathVariable("userName") String userName) {
        return userService.getAllFiles(userName);
    }

    @PostMapping(
            path = "{userName}/{fileName}/update",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateFileInS3Bucket(@PathVariable("userName")String userName,
                                     @RequestParam("file") MultipartFile file,
                                     @PathVariable("fileName")String oldFileName,
                                     @RequestParam("fileDescription") String fileDescription) {
        return userService.updateInS3(userName,file, oldFileName,fileDescription);
    }



}
