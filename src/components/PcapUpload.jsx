import { useState } from "react";

const PcapUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
  };

  const uploadPCAP = async () => {
    if (!file) {
      setStatus("Please select a PCAP file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setStatus("Uploading and parsing PCAP...");

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-pcap", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Upload failed");
      }

      setStatus(`✔ Parsed ${result.parsed_packets} packets successfully`);
      console.log(result);

    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to upload PCAP");
    }
  };

  return (
    <div style={styles.container}>
      <h2>ShadowTrace AI — PCAP Upload</h2>

      <input
        type="file"
        accept=".pcap"
        onChange={handleFileChange}
      />

      <button onClick={uploadPCAP} style={styles.button}>
        Upload & Analyze
      </button>

      <p>{status}</p>
    </div>
  );
}

const styles = {
  container: {
    background: "#020617",
    color: "#e5e7eb",
    padding: "20px",
    width: "420px",
    borderRadius: "10px"
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};


export default PcapUpload