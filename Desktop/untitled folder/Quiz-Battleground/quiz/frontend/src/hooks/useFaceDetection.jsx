import { useEffect } from "react";
import * as faceapi from "face-api.js";

export default function useFaceDetection(videoRef, onNoFaceOrMoveDetected) {
  useEffect(() => {
    let interval;
    let lastBox = null;

    const detectFace = async () => {
      if (!videoRef.current) return;

      // Load models
      await faceapi.nets.tinyFaceDetector.load("/models/");

      interval = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );

        if (!detections.length) {
          // No face detected
          alert("No face detected! Quiz will end.");
          onNoFaceOrMoveDetected();
          return;
        }

        // Check face movement
        const box = detections[0].box; // first face
        if (lastBox) {
          const movement =
            Math.abs(box.x - lastBox.x) > 50 ||
            Math.abs(box.y - lastBox.y) > 50;

          if (movement) {
            alert("You moved too far from camera! Quiz will end.");
            onNoFaceOrMoveDetected();
          }
        }

        lastBox = box; // store last box for next check
      }, 1000); // check every second
    };

    detectFace();

    return () => clearInterval(interval);
  }, [videoRef, onNoFaceOrMoveDetected]);
}
