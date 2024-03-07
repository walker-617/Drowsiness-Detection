import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import { get_landmarks } from "../utils/GetLandmarks";
import { EAR, MAR } from "../utils/AspectRatios";
import { DrawFace } from "../utils/DrawFace";

function Home() {
  const webcamRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [eye_close_count, setEye_close_count] = useState(0);
  const [mouth_open_count, setMouth_open_count] = useState(0);

  const eye_close_count_threshold = 10;
  const mouth_open_count_threshold = 10;

  const EAR_threshold = 0.18;
  const MAR_threshold = 0.25;

  const capture = async () => {
    const imageSS = webcamRef.current.getScreenshot();
    const res = await get_landmarks(imageSS);

    if (res && res.status === "Detected") {
      DrawFace(res);

      const REAR_ = document.getElementById("REAR");
      const LEAR_ = document.getElementById("LEAR");
      const MAR_ = document.getElementById("MAR");
      const rear_value = EAR(
        res.landmarks[36],
        res.landmarks[37],
        res.landmarks[38],
        res.landmarks[39],
        res.landmarks[40],
        res.landmarks[41]
      );
      const lear_value = EAR(
        res.landmarks[42],
        res.landmarks[43],
        res.landmarks[44],
        res.landmarks[45],
        res.landmarks[46],
        res.landmarks[47]
      );
      const mear_value = MAR(
        res.landmarks[60],
        res.landmarks[61],
        res.landmarks[62],
        res.landmarks[63],
        res.landmarks[64],
        res.landmarks[65],
        res.landmarks[66],
        res.landmarks[67]
      );

      REAR_.innerText = rear_value;
      LEAR_.innerText = lear_value;
      MAR_.innerText = mear_value;

      if (rear_value < EAR_threshold || lear_value < EAR_threshold) {
        setEye_close_count(eye_close_count + 1);
      } else {
        setEye_close_count(0);
      }

      if (mear_value > MAR_threshold) {
        setMouth_open_count(mouth_open_count + 1);
      } else {
        setMouth_open_count(0);
      }

      if (eye_close_count > eye_close_count_threshold) {
        const drwosiness = document.getElementById("drowsiness");
        drwosiness.innerText = "Drowsy";
        drwosiness.style.color = "red";
      } else {
        const drwosiness = document.getElementById("drowsiness");
        drwosiness.style.color = "black";
        drwosiness.innerText = "Not Drowsy";
      }

      if (mouth_open_count > mouth_open_count_threshold) {
        const yawning = document.getElementById("yawning");
        yawning.style.color = "red";
        yawning.innerText = "Yawning";
      } else {
        const yawning= document.getElementById("yawning");
        yawning.style.color = "black";
        yawning.innerText = "Not Yawning";
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
  }, [mouth_open_count, eye_close_count]);

  return (
    <div className="container">
      <div className="video-frame">
        <Webcam
          className="video"
          mirrored={true}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
        />
      </div>
      <div className="result-details">
        <div className="faceLandmarks">
          {[...Array(68)].map((_, index) => (
            <div
              key={index}
              className={`landmark${index}`}
              id={`landmark${index}`}
            ></div>
          ))}
        </div>
        <div className="aspect-ratios">
          <div>Left Eye Aspect Ratio</div>
          <div id="LEAR"></div>
          <div>Right Eye Aspect Ratio</div>
          <div id="REAR"></div>
          <div>Mouth Aspect Ratio</div>
          <div id="MAR"></div>
        </div>
        <div className="drwosiness-detection">
          <div className="drowsiness" id="drowsiness">
            Not drowsy
          </div>
          <div className="yawning" id="yawning">
            Not Yawning
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
