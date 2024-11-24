import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Box, Typography } from "@mui/material";
import computerImage from "../../assets/computer.png";

function ComputerCard({ ip, time, timeAdjustment }) {
  const [showAdjustment, setShowAdjustment] = useState(false);
  const [formattedAdjustment, setFormattedAdjustment] = useState("");

  useEffect(() => {
    if (timeAdjustment !== 0) {
      // Define se o ajuste será mostrado
      setShowAdjustment(true);

      // Calcula o ajuste formatado no formato HH:MM:SS
      const absAdjustment = Math.abs(timeAdjustment); // Obtém valor absoluto para evitar números negativos
      const hours = Math.floor(absAdjustment / 3600000); // 1 hora = 3600000 ms
      const minutes = Math.floor((absAdjustment % 3600000) / 60000); // 1 minuto = 60000 ms
      const seconds = Math.floor((absAdjustment % 60000) / 1000); // 1 segundo = 1000 ms

      const formatted = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      setFormattedAdjustment(formatted);

      // Oculta o ajuste após 3 segundos
      const timeout = setTimeout(() => setShowAdjustment(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [timeAdjustment]);


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
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              marginBottom: "2px",
              color: "#000000",
              padding: "4px",
              borderRadius: "4px",
            }}
          >
            {ip || "IP não disponível"}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontSize: "0.9rem" }}
          >
            {time}
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
              {formattedAdjustment}
            </Typography>
          </Box>
        )}
      </Box>
    </Draggable>
  );
}

export default ComputerCard;
