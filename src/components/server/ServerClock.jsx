import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import serverImage from "../../assets/server.png";
import dayjs from "dayjs";

function ServerClock({  ip, time, timeAdjustment }) {
  const [showAdjustment, setShowAdjustment] = useState(false);

  useEffect(() => {
    if (timeAdjustment !== 0) {
      setShowAdjustment(true);
      const timeout = setTimeout(() => setShowAdjustment(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [timeAdjustment]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "20px",
        backgroundColor: "#333",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="server-image-container">
        <img
          src={serverImage}
          alt="Servidor"
          style={{ width: "180px", height: "180px" }}
        />
      </div>
      <Typography
        variant="h6"
        style={{ color: "#81c784", marginTop: "8px", fontWeight: "bold" }}
      >
        Servidor Central
      </Typography>
      <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              marginBottom: "2px",
              color: "#ffffff",
              padding: "4px",
              borderRadius: "4px",
            }}
          >
            {ip || "IP não disponível"}
          </Typography>
      <Typography variant="" style={{ color: "#ffffff", marginTop: "4px" }}>
        {time}
      </Typography>

      {showAdjustment && (
        <Box
          sx={{
            position: "absolute",
            top: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Typography
            variant="body2"
            color={timeAdjustment > 0 ? "green" : "red"}
          >
            {timeAdjustment > 0 ? "▲" : "▼"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.abs(timeAdjustment)}s
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ServerClock;