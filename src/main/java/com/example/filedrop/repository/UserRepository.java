package com.example.filedrop.repository;

import com.example.filedrop.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<User,String> {

    @Query("SELECT u FROM User u WHERE u.userName = ?1")
    User findByUserName(String userName);

    boolean existsByUserEmailOrUserName(String userEmail, String userName);
}
