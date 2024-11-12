import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Box, Typography } from "@mui/material";
import computerImage from "../../assets/computer.png";
import dayjs from "dayjs";

function ComputerCard({ ip, resetTime, time: initialTime, timeAdjustment }) {
  const [time, setTime] = useState(new Date(initialTime));
  const [showAdjustment, setShowAdjustment] = useState(false);
  console.log("ip", ip);
  console.log("type of ip", typeof ip);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => new Date(prevTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (resetTime) {
      setTime(new Date(0)); 
      setShowAdjustment(true); 

      const hideTimeout = setTimeout(() => setShowAdjustment(false), 3000);
      return () => clearTimeout(hideTimeout);
    }
  }, [resetTime]);

  const formattedTime = dayjs(time).format("HH:mm:ss");

  return (
    <Draggable>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          cursor: "move",
          backgroundColor: "#ffffff",
          padding: "4px",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          border: "2px solid #4caf50",
          position: "relative", 
          width: "160px",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
            borderColor: "#81c784",
          },
        }}
      >
        <img
          src={computerImage}
          alt="Computador"
          style={{ width: "100px", height: "90px", marginBottom: "4px" }}
        />
        <Box textAlign="center">
          {/* Ajuste no Typography para garantir a visibilidade do IP */}
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              marginBottom: "2px",
              color: "#000000", // Forçar a cor preta para maior contraste
              padding: "4px",
              borderRadius: "4px",
            }}
          >
            IP: {ip || "IP não disponível"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.9rem" }}
          >
            Horário: {formattedTime}
          </Typography>
        </Box>

        {showAdjustment && (
          <Box
            sx={{
              position: "absolute",
              top: "-30px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "white",
              padding: "4px 6px",
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
    </Draggable>
  );
}

export default ComputerCard;
