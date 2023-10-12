package com.example.filedrop.dto;

import java.sql.Timestamp;

public class FileDTO {
    private String fileName;
    private String userFirstName;
    private String userLastName;
    private String userName;
    private String fileDescription;
    private Timestamp createdOn;
    private Timestamp updatedOn;
    private String fileURL;

    public FileDTO(String fileName, String userFirstName, String userLastName, String userName, String fileDescription, Timestamp createdOn, Timestamp updatedOn, String fileURL) {
        this.fileName = fileName;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userName = userName;
        this.fileDescription = fileDescription;
        this.createdOn = createdOn;
        this.updatedOn = updatedOn;
        this.fileURL = fileURL;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFileDescription() {
        return fileDescription;
    }

    public void setFileDescription(String fileDescription) {
        this.fileDescription = fileDescription;
    }

    public Timestamp getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Timestamp createdOn) {
        this.createdOn = createdOn;
    }

    public Timestamp getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(Timestamp updatedOn) {
        this.updatedOn = updatedOn;
    }

    public String getFileURL() {
        return fileURL;
    }

    public void setFileURL(String fileURL) {
        this.fileURL = fileURL;
    }
}

