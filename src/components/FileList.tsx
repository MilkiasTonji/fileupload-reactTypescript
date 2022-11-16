import { Button, message, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { deleteFile, getAllFiles } from "../services";

import moment from "moment";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: React.Key;
  fileName: string;
  fileSize: string;
  createdAt: any;
}

interface AppProps {
  fileChanged: boolean;
  setFileChanged: any;
}

const FileList: React.FC<AppProps> = ({
  fileChanged,
  setFileChanged,
}: AppProps) => {
  const [noDataMessage, setNoDataMessage] = useState("");
  const [data, setData] = useState<DataType[]>([]);
  const [total, setTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFiles();
  }, [fileChanged]);

  const getFiles = () => {
    setLoading(true);
    getAllFiles()
      .then((resp) => {
        const { success, files } = resp;
        setLoading(false);
        if (success && !files) {
          setNoDataMessage("No File");
        }
        if (success && Object.keys(files).length > 0) {
          const { count, rows } = files;
          setData(rows);
          setTotal(count);
        }
      })
      .catch((err) => {
        setErrorMessage(err);
        setLoading(false);
      });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (imgUrl) => (
        <div className="w-14 h-14 flex items-center justify-center rounded-full">
          <img src={imgUrl} alt="filename url" className="rounded-full" />
        </div>
      ),
    },
    {
      title: "fileName",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "fileSize",
      dataIndex: "fileSize",
      key: "fileSize",
      render: (_, record) => <div>{formatBytes(record.fileSize)}</div>,
    },
    {
      title: "uploadedDate",
      dataIndex: "uploadedDate",
      key: "uploadedDate",
      render: (_, record) => (
        <div>
          <p>{moment(record.createdAt).format("L")}</p>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id) => (
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => gotoEdit(id)}>Edit</Button>
          <Button danger onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const gotoEdit = (id: any) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = (id: any) => {
    deleteFile(id)
      .then((resp) => {
        const { success } = resp;
        const _message = resp.message;
        if (success) {
          message.success(_message);
          setFileChanged(true);
        } else {
          setErrorMessage(_message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err);
        setFileChanged(false);
      });
  };

  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <div className="flex flex-col">
      {
        // call modal here
      }
      {errorMessage && <span className="text-red-400">{errorMessage}</span>}

      {loading ? (
        <span>Loading..</span>
      ) : (
        <Table
          dataSource={data}
          columns={columns}
          // pagination={{
          //     pageSize: pageSize,
          //     total: total,
          //     onChange: (page, pageSize) => {
          //         setPage(page)
          //         setPageSize(pageSize)
          //     }
          // }}
        />
      )}
    </div>
  );
};

export default FileList;
