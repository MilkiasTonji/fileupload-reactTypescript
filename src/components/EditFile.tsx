import { Button, message, Upload } from "antd";
import React, {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { updateFile } from "../services";

const EditFile: React.FC = () => {
  const { id } = useParams();

  const [file, setFile] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate()

  const { Dragger } = Upload;

  const fileTypes = ["image/png", "image/jpg", "image/jpeg"];

  const props: UploadProps = {
    name: "file",
    beforeUpload: (file) => {
      const isFile = fileTypes.includes(file.type);
      if (!isFile) {
        message.error(`${file.name} is not supported`);
      }
      if (file.size > 10000000) {
        message.error(`${file.size} is too big file`);
      }
      return false;
    },
    onChange(info) {
    //   const { name, size } = info.file;
      setFile(info.file);
      console.log("name: size", info.file);
    },
    onDrop(e) {
      setFile(e.dataTransfer.files);
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const saveFile = () => {
    setConfirmLoading(true);
    updateFile(id, file)
      .then((resp) => {
        const { success, file } = resp;
        setConfirmLoading(false);
        if (success && Object.keys(file).length > 0) {
          const { fileName, id } = file;
          if (fileName && id) {
            message.success("File Uploaded successfully!");
            setTimeout(() => {
                navigate('/')
            }, 2000)
          }
        }
      })
      .catch((err) => {
        setConfirmLoading(false);
        setErrorMessage(err);
      });
  };

  return (
    <div className="flex flex-col items-center pt-20 bg-gray-100 h-screen">
      <h1 className="text-2xl m-4 font-bold">Edit your file</h1>
      <div className="w-1/3 bg-white flex-col shadow-md rounded-md p-3 mb-6">
        {errorMessage && (
          <div className="p-2 m-2 text-red-400">{errorMessage}</div>
        )}
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </div>
      <Button 
      onClick={saveFile}
       type="primary" 
       style={{ background: "#1890ff", borderColor: "#1890ff" }}
       loading={confirmLoading}
       >
        Upload
      </Button>
    </div>
  );
};

export default EditFile;
