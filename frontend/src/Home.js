import React, {useEffect, useState} from "react";
import NavForProfile from "./components/NavForProfile";
import "./App.css";
import Sidebar from "./components/Sidebar";
import axios from "axios";

const Home = () => {
  const[files, setFiles] = useState([]);
  const formData = new FormData();
  const [fileDescription, setFileDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://localhost:8080/api/v1/user/"+localStorage.getItem("userName")+"/files", {
      }).then((res) =>
      {
        setFiles(res.data);
      }).catch(err => console.log(err));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const onFileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  }
  formData.append('file', selectedFile);
  async function upload(event) {
    event.preventDefault();
    try {
      console.log(formData);
      await axios.post("http://localhost:8080/api/v1/user/"+ localStorage.getItem("userName")+"/upload",
          formData).then(res => {
        console.log(res);
        alert("File uploaded successfully");

      })
    } catch (e) {
      console.log(e);
      alert("Error in uploading file. File size greater than 10MB");
    }
  }

  async function download(event) {
    event.preventDefault();
    const fileName = document.getElementById("download").value;

    console.log(fileName);
    try {
      await axios.get("http://localhost:8080/api/v1/user/"+
          localStorage.getItem("userName")+"/"+fileName+"/download")
          .then(res => {
            const blob = new Blob(res,{type: []});
            // const link = document.createElement("a");
            // link.href = window.URL.createObjectURL(blob);
            // link.download = fileName;
            // link.click();
            const url = url.createObjectURL(blob);
            window.open(url);

            })
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteFile(event) {
    event.preventDefault();
    const fileName = document.getElementById("update").value;
    try {
      await axios.delete("http://localhost:8080/api/v1/user/"+
          localStorage.getItem("userName")+"/"+fileName+"/delete")
          .then(res => {
            console.log(res);
            alert("File deleted successfully");
          })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <NavForProfile />
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="upload">
        <h2>Upload files</h2>
        <br></br>
        <input type="file" onChange={onFileChangeHandler} />
        <input type="text" className="description" placeholder="File Description"  value={fileDescription} onChange={(event) => {
          setFileDescription(event.target.value);
        }}></input>
        <button className="uploadfile" onClick={upload}>Upload</button>
        <table>
          <thead>
          <tr>
            {localStorage.getItem("userRole") == "admin"? }
            <th>File Name</th>
            <th>Created on</th>
            <th>Updated on</th>
            <th>Download</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {
            files.map((file,index) => {
             return <tr key={index}>
                <td>{file.fileName}</td>
                <td>{file.createdOn}</td>
                <td>{file.updatedOn}</td>
                <td>
                  <button className="ops" id = "download"><a href={file.fileURL}>Download</a></button>
                </td>
                <td>
                  <button className="ops" id = "update" value={file.fileName} onClick = {upload}>Update</button>
                </td>
                <td>
                  <button className="ops" id = "delete" value={file.fileName} onClick = {deleteFile}>Delete</button>
                </td>
              </tr>
            })
          }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
