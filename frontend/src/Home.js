import React, {useEffect, useState} from "react";
import NavForProfile from "./components/NavForProfile";
import "./App.css";
import Sidebar from "./components/Sidebar";
import axios from "axios";

const Home = () => {
  const[files, setFiles] = useState([]);
  const formData = new FormData();
  const[currentFileName, setCurrentFileName] = useState("");
  const[currentUserName, setCurrentUserName] = useState("");
  const [fileDescription, setFileDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const[modal, setModal] = useState(false);
  const[editModal, setEditModal] = useState(false);
  const[loading, setLoading] = useState(false);
  localStorage.setItem("currentFileName",currentFileName);
  localStorage.setItem("currentUserName",currentUserName);
  useEffect(() => {
      axios.get("http://localhost:8080/api/v1/user/"+localStorage.getItem("userName")+"/files", {
      }).then((res) =>
      {
        setFiles(res.data);
      }).catch(err => console.log(err));

  }, []);

  const toggleModal = () => {
    setModal(!modal);
    setFileDescription("");
  }

  const onFileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  }
  formData.append('file', selectedFile);
  formData.append('fileDescription',fileDescription);
  async function upload(event) {
    setLoading(true);
    event.preventDefault();
    const userNAME = localStorage.getItem("userRole") === "user" ? localStorage.getItem("userName"): localStorage.getItem("currentUserName");
    try {
      console.log(formData);
      await axios.post("http://localhost:8080/api/v1/user/"+ userNAME+"/upload",
          formData).then(res => {
            setLoading(false);
        console.log(res);
        alert("File uploaded successfully");
        window.location.reload();
      })
    } catch (e) {
      setLoading(false);
      console.log(e);
      alert("Error in uploading file."+e.response.data);
    }
  }

  async function update(event) {
    setLoading(true);
    event.preventDefault();
    const userNAME = localStorage.getItem("userRole") === "user" ? localStorage.getItem("userName"): localStorage.getItem("currentUserName");
    const fileName = localStorage.getItem("currentFileName");
    console.log(fileName);
    try {
      await axios.post("http://localhost:8080/api/v1/user/"+
          userNAME+"/"+fileName+"/update",formData)
          .then(res => {
            setLoading(false);
            console.log(res);
            alert("File Updated Successfully");
            window.location.reload();
          })
    } catch (e) {
      setLoading(false);
      console.log(e);
      alert(e.response.data);
    }
    }

  async function deleteFile(event) {
    setLoading(true);
    event.preventDefault();
    const userNAME = localStorage.getItem("userRole") === "user" ? localStorage.getItem("userName"): event.target.value;
    console.log(userNAME);
    const fileName = event.target.id;
    try {
      await axios.delete("http://localhost:8080/api/v1/user/"+
          userNAME+"/"+fileName+"/delete")
          .then(res => {
            setLoading(false);
            console.log(res);
            alert("File deleted successfully");
            window.location.reload();
          })
    } catch (e) {
      setLoading(false);
      console.log(e.response.data);
    }
  }

  return (
    <>
      <NavForProfile />
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="upload">
        {localStorage.getItem("userRole") === "user" && <button className="uploadfile" id="test" onClick={toggleModal}>Upload</button>}
        {modal && ( <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <h2>Upload files</h2>
              <br></br>
              <input type="file" onChange={onFileChangeHandler} />
              <input type={"text"} value={fileDescription} placeholder={"Enter File Description"} onChange={(event) => {
                setFileDescription(event.target.value);
              }}></input>
              <button onClick={upload}>{loading ? 'Uploading...' : 'Upload'}</button><br></br><br></br>
              <button className="close-modal" onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div>
            )}
        <table>
          <thead>
          <tr>
            {localStorage.getItem("userRole") === "admin" && <th>First Name</th>}
            {localStorage.getItem("userRole") === "admin" && <th>Last Name</th>}
            <th>File Name</th>
            <th>File Description</th>
            <th>Created on</th>
            <th>Updated on</th>
            {localStorage.getItem("userRole") === "user" && <th>Download</th>}
            {localStorage.getItem("userRole") === "user" && <th>Update</th>}
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {
            files.map((file,index) => {
             return <tr key={index}>
               {localStorage.getItem("userRole") === "admin" && <td>{file.userFirstName}</td>}
               {localStorage.getItem("userRole") === "admin" && <td>{file.userLastName}</td>}
vi                <td>{file.fileName}</td>
               <td>{file.fileDescription}</td>
                <td>{file.createdOn}</td>
                <td>{file.updatedOn}</td>
                <td>
                  {localStorage.getItem("userRole") === "user" && <button className="ops" id = "download"><a href={file.fileURL}>Download</a></button>}
                </td>
                <td>
                  { localStorage.getItem("userRole") === "user" && <button className="ops" id={file.fileName} onClick = { () => {
                    setCurrentFileName(file.fileName)
                    setCurrentUserName(file.userName);
                    setEditModal(!editModal);
                  }}>Update</button>}
                  {editModal && ( <div className="modal">
                        <div className="overlay">
                          <div className="modal-content">
                            <h2>Update file</h2>
                            <br></br>
                            <input type="file" onChange={onFileChangeHandler} />
                            <input type={"text"} value={fileDescription} placeholder={"Enter new file description"} onChange={(event) => {
                              setFileDescription(event.target.value);
                            }}></input>
                            <button onClick={update}>Update</button><br></br><br></br>
                            <button className="close-modal" onClick={() => {
                              setEditModal(!editModal);
                              setFileDescription("");
                            }}>Close</button>
                          </div>
                        </div>
                      </div>
                  )}
                </td>
                <td>
                  <button className="ops" id = {file.fileName} value = {file.userName} onClick = {deleteFile}>Delete</button>
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
