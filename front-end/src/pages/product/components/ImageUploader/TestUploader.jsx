import React, { useCallback, useState } from "react";
import axios from "axios";

function TestUploader() {
  const [file, setFile] = useState(null);

  const handleChange = useCallback((e) => {
    if (e.target.files === null) return;

    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }, []);

  const handleClick = useCallback(async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    const uploader = { name: "huewilliams" };
    formData.append("uploader", JSON.stringify(uploader));
    try {
      const res = await axios.post("http://localhost:4000/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) console.log(res.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }, [file]);

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>Upload Request</button>
    </div>
  );
}

export default TestUploader;
