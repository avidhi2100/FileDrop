package com.example.filedrop.Entity;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.UUID;

@Entity(name = "file")
@Table(name="file")
public class File {

    @Id
    @Column(name="file_id")
    private String fileId;

    @Column(name="user_name")
    private String userName;

    @Column(name="file_name")
    private String fileName;

    @Column(name="file_description")
    private String fileDescription;

    @Column(name="created_on")
    private Timestamp createdOn;

    @Column(name="updated_on")
    private Timestamp updatedOn;

    @Column(name="file_url")
    private String fileURL;


    public File(String fileId, String userName, String fileName, String fileDescription, Timestamp createdOn, Timestamp updatedOn, String fileURL) {
        this.fileId = fileId;
        this.userName = userName;
        this.fileName = fileName;
        this.fileDescription = fileDescription;
        this.createdOn = createdOn;
        this.updatedOn = updatedOn;
        this.fileURL = fileURL;
    }

    public File() {
    }

    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
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

    public String getFileDescription() {
        return fileDescription;
    }

    public void setFileDescription(String fileDescription) {
        this.fileDescription = fileDescription;
    }
}
