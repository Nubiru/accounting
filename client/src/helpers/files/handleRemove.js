import axios from "axios";
import { getList } from "./getList.js";
import { useNavigate } from "react-router-dom";

export const handleRemove = async (file) => {
  const data = {
    fileName: file,
  };
  try {
    const response = await axios.post(
      "http://localhost:3500/files/remove",
      data
    );
    console.log("File removed: ", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
  // setTimeout(() => {
  //   getList(setFiles, setFolder, customerFolder, subFolder, setFolderPath);
  // }, 1000);
};
