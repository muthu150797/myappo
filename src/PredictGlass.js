import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

function PredictGlass() {
  const webcamRef = useRef(null);
  const [result, setResult] = useState(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // Convert base64 → Blob
    const res = await fetch(imageSrc);
    const blob = await res.blob();

    const formData = new FormData();
    formData.append("file", blob, "capture.jpg");

    try {
      const response = await fetch("https://dockertest-pgan.onrender.com/predictGlass", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Prediction result:", data.message);
      alert(data.message);
      setResult(data.message);
    } catch (err) {
        alert(err);
      console.error("Upload failed", err);
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

      {result && (
        <pre style={{ marginTop: "20px" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default PredictGlass;
