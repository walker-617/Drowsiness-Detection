import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import { get_landmarks } from "../utils/GetLandmarks";

function Home() {
  const webcamRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(false);

  const capture = async () => {
    const imageSS = webcamRef.current.getScreenshot();
    const res = await get_landmarks(imageSS);

    if (res && res.status === "Detected") {
      for (const i in res.landmarks) {
        const x = res.landmarks[i][0];
        const y = res.landmarks[i][1];
        const landmark = document.getElementById(`landmark${i}`);
        landmark.style.left = `${x}px`;
        landmark.style.top = `${y}px`;
      }
      setFaceDetected(true);
    } else {
      setFaceDetected(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="video-frame">
        <Webcam
          className="video"
          mirrored={true}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={600}
          videoConstraints={{ facingMode: "user" }}
        />
        {[...Array(68)].map((_, index) => (
          <div
            key={index}
            className={`landmark${index}`}
            id={`landmark${index}`}
          ></div>
        ))}
      </div>
    </>
  );
}

export default Home;
