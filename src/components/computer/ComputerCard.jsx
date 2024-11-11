import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { Box, Typography } from '@mui/material';
import computerImage from '../../assets/computer.png';

function ComputerCard({ ip, resetTime, time: initialTime, timeAdjustment }) {
  const [time, setTime] = useState(new Date(initialTime));
  const [showAdjustment, setShowAdjustment] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => new Date(prevTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (resetTime) {
      setTime(new Date(0)); // Reset para 00:00:00
      setShowAdjustment(true); // Exibe o popup de ajuste após o reset

      // Oculta o popup após 3 segundos
      const hideTimeout = setTimeout(() => setShowAdjustment(false), 3000);
      return () => clearTimeout(hideTimeout);
    }
  }, [resetTime]);

  const formattedTime = time.toLocaleTimeString();

  return (
    // <Draggable>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          cursor: 'move',
          backgroundColor: '#ffffff',
          padding: '8px',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          border: '2px solid #4caf50',
          position: 'relative', // Necessário para posicionar o popup
          width: '160px', // Largura reduzida para deixar mais compacto
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
            borderColor: '#81c784',
          },
        }}
      >
        <img
          src={computerImage}
          alt="Computador"
          style={{ width: '90px', height: '90px', marginBottom: '4px' }} // Aumentei o tamanho e reduzi a margem
        />
        <Box textAlign="center">
          <Typography variant="body1" fontWeight="bold" sx={{ marginBottom: '2px' }}>
            IP: {ip}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            Horário: {formattedTime}
          </Typography>
        </Box>

        {showAdjustment && (
          <Box
            sx={{
              position: 'absolute',
              top: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              padding: '4px 6px',
              borderRadius: '4px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Typography variant="body2" color={timeAdjustment > 0 ? 'green' : 'red'}>
              {timeAdjustment > 0 ? '▲' : '▼'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.abs(timeAdjustment)}s
            </Typography>
          </Box>
        )}
      </Box>
    // {/* </Draggable> */}
  );
}

export default ComputerCard;
