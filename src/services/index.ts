import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// type DataType = {
//   key: React.Key;
//   fileName: string;
//   fileSize: string;
//   uploadedDate: any;
// };

export const getAllFiles = async () => {
  try {
    const resp = await axios.get<any>(`${BASE_URL}/files`);
    return resp?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const uploadFile = async (file: any) => {
  try {
    const formdata = new FormData();
    formdata.append("file", file);
    const resp = await axios.post(`${BASE_URL}/file`, formdata);
    return resp?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const updateFile = async (id: any, file: any) => {
  try {
    const formdata = new FormData();
    formdata.append("file", file);
    const resp = await axios.put(`${BASE_URL}/file/${id}`, formdata);
    return resp?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export const deleteFile = async (id: any) => {
  try {
    const resp = await axios.delete(`${BASE_URL}/file/${id}`);
    return resp?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
