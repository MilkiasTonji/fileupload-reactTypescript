import { Button, message } from "antd";
import React, { useState, useEffect } from "react";
import { uploadFile } from "../services";
import CustomModal from "./CustomModal";
import FileList from "./FileList";

const FileUpload: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileChanged, setFileChanged] = useState(false);

  useEffect(() => {
    console.log('it re-renders')
  }, [fileChanged]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // use formdata to send file
    setConfirmLoading(true);
    uploadFile(file)
      .then((resp) => {
        const { success, file } = resp;
        setConfirmLoading(false);
        if (success && Object.keys(file).length > 0) {
          const { fileName, id } = file;
          if (fileName && id) {
            setFileChanged(true);
            message.success("File Uploaded successfully!");
            setVisible(false);
          }
        }
      })
      .catch((err) => {
        setConfirmLoading(false);
        setVisible(false);
        setErrorMessage(err);
        setFileChanged(false);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="w-full h-screen flex items-start justify-center p-4 bg-gray-200">
      {visible && (
        <CustomModal
          open={visible}
          confirmLoading={confirmLoading}
          handleOk={handleOk}
          handleCancel={handleCancel}
          setFile={setFile}
          errorMessage={errorMessage}
        />
      )}
      <div className="w-1/2 h-full bg-white flex-col shadow-md rounded-md p-3">
        <div className="flex items-center justify-between">
          <h1>File Upload</h1>
          <Button type="primary" className="bg-blue-500" onClick={showModal}>
            Upload
          </Button>
        </div>
        <div className="p-3 mt-5">
          <FileList 
           fileChanged = {fileChanged}
           setFileChanged={setFileChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
