import { Button } from "antd";
import React, { useState } from "react";
import CustomModal from "./CustomModal";
import FileList from "./FileList";

const FileUpload: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [file, setFile] = useState(null)

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // use formdata to send file
    const formdata = new FormData()
    console.log("file: ", file)
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
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
          setFile = {setFile}
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
          <FileList />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
