// src/hooks/useCamera.js
import { useEffect, useRef } from "react";

export default function useCamera(videoRef, enabled) {
  const streamRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (cancelled) return;
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          try {
            await videoRef.current.play();
          } catch (e) {
            // Autoplay can fail without user gesture; UI should prompt user to click anywhere
            console.warn("video.play() failed:", e?.message);
          }
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    start();

    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [videoRef, enabled]);

  return {
    stop: () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    },
  };
}
