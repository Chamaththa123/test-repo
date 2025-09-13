

import React, { useState } from "react";

export default function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!file) {
      setStatus("choose file");
      return;
    }

    if (!file.type.includes("image") && !file.name.endsWith(".pdf")) {
      setStatus("unsupported file type");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const data = reader.result; 
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "X-File-Name": file.name },
          body: data,
        });
        setStatus("uploaded: " + res.status);
      } catch (err) {
        setStatus("err " + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <form onSubmit={submit}>
      <input type="file" onChange={e=>setFile(e.target.files && e.target.files[0])} />
      <button>Upload</button>
      <div>{status}</div>
    </form>
  );
}
