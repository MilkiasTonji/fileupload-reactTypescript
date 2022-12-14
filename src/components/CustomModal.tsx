import { Modal } from "antd";
import React, {  } from "react";

import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

interface AppProps {
  open: boolean;
  confirmLoading: boolean;
  handleOk: any;
  handleCancel: any;
  setFile: any;
  errorMessage: string,
}

const CustomModal: React.FC<AppProps> = ({
  open,
  confirmLoading,
  handleOk,
  handleCancel,
  setFile,
  errorMessage
}: AppProps) => {
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
      // const { name, size } = info.file;
      setFile(info.file);
      console.log("name: size", info.file);
    },
    onDrop(e) {
      setFile(e.dataTransfer.files);
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Modal
      title="Add New File"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Upload"
      okButtonProps={{
        style: { background: "#1890ff", borderColor: "#1890ff" }
      }}
    >
      <div className="flex items-center justify-center p-3">
        {
          errorMessage && 
          <div className="p-2 m-2 text-red-400">{errorMessage}</div>  
        }

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
    </Modal>
  );
};

export default CustomModal;
