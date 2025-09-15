import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

function PredictGlass() {
  const webcamRef = useRef(null);
  const [result, setResult] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
  
    // base64 → Blob conversion
    const byteString = atob(imageSrc.split(",")[1]);
    const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
  
    const formData = new FormData();
    formData.append("file", blob, "capture.jpg");
    try {
      const response = await fetch("https://dockertest-pgan.onrender.com/predictGlass", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      alert("success: "+data.status);
      console.log("Prediction result:", data.status);
      setResult(data.status); // save status separately
      setImageBase64(data.detections.imageAsBase64); // save base64 image
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed: " + err);
    }
  };
  

  return (
    <div>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        height={300}
      />
      <button onClick={capture}>Capture & Detect</button>
 {/* Show image from server */}
 {imageBase64 && (
        <img
          src={`data:image/jpeg;base64,${imageBase64}`}
          alt="Prediction Result"
          style={{ marginTop: "20px", width: "400px" }}
        />
      )}
            {result && (
        <pre style={{ marginTop: "20px" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default PredictGlass;
