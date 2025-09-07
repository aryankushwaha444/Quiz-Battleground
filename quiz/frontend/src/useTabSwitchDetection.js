import { useEffect, useState, useRef } from "react";

const useTabSwitchDetection = (onTabSwitch, onTimeExpired, timeLimit = 5) => {
  const [isTabActive, setIsTabActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showWarning, setShowWarning] = useState(false);
  const timerRef = useRef(null);
  const warningTimerRef = useRef(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab lost focus - immediately end quiz
        setIsTabActive(false);
        setShowWarning(true);
        setTimeLeft(0);

        // Clear any existing timers
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        if (warningTimerRef.current) {
          clearTimeout(warningTimerRef.current);
          warningTimerRef.current = null;
        }

        // Immediately call the callback to end quiz
        onTabSwitch();
        onTimeExpired();
      } else {
        // Tab regained focus
        setIsTabActive(true);
        setShowWarning(false);
        setTimeLeft(timeLimit);

        // Clear timers
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        if (warningTimerRef.current) {
          clearTimeout(warningTimerRef.current);
          warningTimerRef.current = null;
        }
      }
    };

    const handleFocus = () => {
      if (!document.hidden) {
        setIsTabActive(true);
        setShowWarning(false);
        setTimeLeft(timeLimit);

        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    };

    const handleBlur = () => {
      // Window lost focus - immediately end quiz
      setIsTabActive(false);
      setShowWarning(true);
      setTimeLeft(0);

      // Clear any existing timers
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
        warningTimerRef.current = null;
      }

      // Immediately call the callback to end quiz
      onTabSwitch();
      onTimeExpired();
    };

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
      }
    };
  }, [onTabSwitch, onTimeExpired, timeLimit]);

  return {
    isTabActive,
    timeLeft,
    showWarning,
  };
};

export default useTabSwitchDetection;
