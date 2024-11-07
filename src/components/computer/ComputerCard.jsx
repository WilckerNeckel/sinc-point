import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { Box, Typography } from '@mui/material';
import computerImage from '../../assets/computer.png';

function ComputerCard({ ip, resetTime, time: initialTime = new Date() }) {
  const [time, setTime] = useState(new Date(initialTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => new Date(prevTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (resetTime) {
      setTime(new Date(0)); // Reset para 00:00:00
    }
  }, [resetTime]);

  const formattedTime = time.toLocaleTimeString();

  return (
    <Draggable>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'move',
          backgroundColor: '#ffffff',
          padding: '12px',
          borderRadius: '12px',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          border: '2px solid #4caf50',
        //   transition: 'transform 0.3s, box-shadow 0.3s',
          width: '220px',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)',
            borderColor: '#81c784',
          },
        }}
      >
        <img
          src={computerImage}
          alt="Computador"
          style={{ width: '50px', height: '50px', marginRight: '16px' }}
        />
        <Box>
          <Typography variant="body1" fontWeight="bold">
            IP: {ip}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Horário: {formattedTime}
          </Typography>
        </Box>
      </Box>
    </Draggable>
  );
}

export default ComputerCard;
