# Filedrop
Project site: www.datadrop.online

The web application has the following functionality for authorized users:
1) Sign Up: On Sign Up, an SNS notification subscription is created for the user in the SNS topic. Users have to subscribe to those notifications from the email sent to their email id used during signup.
If email is not found in the inbox, it will present in the spam folder.
![Screenshot 2023-10-16 at 9.40.05 PM.png](..%2F..%2F..%2F..%2F..%2Fvar%2Ffolders%2Fc3%2Fq6jjjhds1x74x2ypy7wmy_bh0000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_6cw6LL%2FScreenshot%202023-10-16%20at%209.40.05%20PM.png)
2) Login:
    ![Screenshot 2023-10-16 at 9.41.06 PM.png](..%2F..%2F..%2F..%2F..%2Fvar%2Ffolders%2Fc3%2Fq6jjjhds1x74x2ypy7wmy_bh0000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_lUrycl%2FScreenshot%202023-10-16%20at%209.41.06%20PM.png)
3) Upload Files:Files with max size upto 10MB can be uploaded. A small file description can also be added.
   ![](/Users/poorvaagarwal/Desktop/Screenshot 2023-10-16 at 12.37.45 AM.png)

4) Delete Files
5) Download Files
The files can be downloaded by clicking on the download button. For the download functionality CloudFront links are leveraged
5Update Files: In case of update a new file and description can be chosen and the same record is updated in the database table. The old file is deleted and the new file is uploaded.
6) Admin View:
The admin can view the files uploaded by all users and can also delete those files


# Architecture:
![Screenshot 2023-10-16 at 9.29.23 PM.png](..%2F..%2F..%2F..%2F..%2Fvar%2Ffolders%2Fc3%2Fq6jjjhds1x74x2ypy7wmy_bh0000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_C1qbW3%2FScreenshot%202023-10-16%20at%209.29.23%20PM.png)
