import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import from react-icons (Font Awesome)
import { useLocation, useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevLocation = useRef(null); // To store the previous location
  const [canGoBack, setCanGoBack] = useState(false); // To determine if the back button should be enabled

  useEffect(() => {
    // Update the ref with the current location on route change
    if (location.pathname !== prevLocation.current) {
      prevLocation.current = location.pathname;
      setCanGoBack(true); // Enable back button when there's a valid previous location
    }
  }, [location]);

  const handleBack = () => {
    if (prevLocation.current) {
      // Navigate to the previous route
      navigate(-1);
    } else {
      // Fallback to a default route if no previous location
      navigate("/");
    }
  };

  return (
    <div
      className="back-button"
      style={{
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        background: "transparent",
      }}
    >
      <button
        onClick={handleBack}
        style={{
          background: "transparent",
          border: "none",
          cursor: canGoBack ? "pointer" : "not-allowed",
          opacity: canGoBack ? 1 : 0.5,
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
        }}
        disabled={!canGoBack}
        title="Go Back"
      >
        <FaArrowLeft
          style={{
            color: canGoBack ? "#007BFF" : "#A9A9A9", // Use primary blue when active
            transition: "color 0.3s ease",
          }}
        />
      </button>
    </div>
  );
};

export default BackButton;
