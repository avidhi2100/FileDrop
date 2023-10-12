package com.example.filedrop.service;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;

import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.SubscribeRequest;

import javax.management.Attribute;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AWSService {

    private final S3Client s3Client;
    private final SnsClient snsClient;

    public AWSService(S3Client s3Client, SnsClient snsClient) {
        this.s3Client = s3Client;
        this.snsClient = snsClient;
    }

    public void putObject(String bucketName, String key, byte[] file) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        s3Client.putObject(objectRequest, RequestBody.fromBytes(file));

    }
    public void deleteObject(String bucketName,String key) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }

    public void createSNSSubscription(String topicName, String userName, String userEmail) {
        String filterPolicy = "{\"userName\":[\""+userName+"\"]}";
//         Map<String, List<String>> filterPolicy = new HashMap<>();
//         filterPolicy.put("userName", List.of(userName));
        snsClient.subscribe(
                SubscribeRequest.builder()
                        .topicArn(topicName)
                        .protocol("email")
                        .endpoint(userEmail)
                        .attributes(Map.of("FilterPolicy",filterPolicy))
                        .build());
    }
}
