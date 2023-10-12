package com.example.filedrop.repository;

import com.example.filedrop.Entity.File;
import com.example.filedrop.dto.FileDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@EnableJpaRepositories
public interface FileRepository extends JpaRepository<File, String> {


    List<File> findAllByUserName(String userName);
    @Query("select f from file f where f.userName = ?1 and f.fileName = ?2")
    File getByFileNameAndUserName(String userName, String fileName);
}
