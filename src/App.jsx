import React, { useState, useEffect, useContext } from "react";
import ComputerGrid from "./components/computer/ComputerGrid";
import ServerClock from "./components/server/ServerClock";
import { Drawer, Box, TextField, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "./App.css";
import { NotificationContext } from "./contexts/NotificationContext";

function App() {
  const [sync, setSync] = useState(false);
  const [resetTime, setResetTime] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const [computers, setComputers] = useState([
    {
      id: 1,
      ip: "192.168.1.200",
      time: dayjs().format("DD/MM/YYYY HH:mm:ss"),
      timeAdjustment: 0,
    },
  ]);
  const [newComputer, setNewComputer] = useState({
    ip: "",
    date: dayjs(),
    time: dayjs(),
  });

  // Atualiza os tempos de todos os computadores em 1 segundo a cada intervalo
  useEffect(() => {
    const interval = setInterval(() => {
      setComputers((prevComputers) =>
        prevComputers.map((computer) => ({
          ...computer,
          time: dayjs(computer.time, "DD/MM/YYYY HH:mm:ss")
            .add(1, "second")
            .format("DD/MM/YYYY HH:mm:ss"),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Ajusta os tempos de acordo com o algoritmo de Berkeley quando `resetTime` é true
  useEffect(() => {
    if (resetTime) {
      setComputers((prevComputers) =>
        prevComputers.map((computer) => ({
          ...computer,
          time: dayjs(computer.time, "DD/MM/YYYY HH:mm:ss")
            .add(computer.timeAdjustment, "millisecond")
            .format("DD/MM/YYYY HH:mm:ss"),
        }))
      );
    }
  }, [resetTime]);

  const onDeleteCard = (ip) => {
    setComputers((prev) => prev.filter((computer) => computer.ip !== ip));
  };

  function applyBerkeleyAlgorithm(clockList) {
    // Converte os tempos para objetos Day.js
    const times = clockList.map((clock) =>
      dayjs(clock.time, "DD/MM/YYYY HH:mm:ss")
    );

    // Calcula o tempo médio em milissegundos
    const avgTimeMs =
      times.reduce((total, time) => total + time.valueOf(), 0) / times.length;

    // Atualiza os ajustes em milissegundos
    const updatedClockList = clockList.map((clock, index) => {
      const currentMs = times[index].valueOf();
      const adjustmentMs = Math.round(avgTimeMs - currentMs); // Ajuste em milissegundos

      return {
        ...clock,
        timeAdjustment: adjustmentMs, // Agora apenas milissegundos
      };
    });
    return updatedClockList;
  }

  const handleSync = () => {
    // Captura o tempo de início imediato
    setSync(true);
    setResetTime(false);

    // Temporizador para desativar o efeito de sincronização
    setTimeout(() => {
      const startExecution = performance.now();
      console.log("start execution ", startExecution);
      setSync(false);
      setComputers((prev) => applyBerkeleyAlgorithm(prev));
      setResetTime(true);
      const endExecution = performance.now();
      console.log("end execution ", endExecution);
      const elapsedExecution = (endExecution - startExecution) / 1000;

      console.log("elapsed variable", elapsedExecution);
      showNotification({
        title: "Synchronized clocks",
        message: `Time: ${elapsedExecution} seconds.`,
        type: "success",
      });
    }, 7400);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComputer((prev) => ({ ...prev, [name]: value }));
  };

  const isValidIP = (ip) => {
    const parts = ip.split(".");
    if (parts.length !== 4) return false;
    for (let part of parts) {
      const num = parseInt(part, 10);
      if (isNaN(num) || num < 0 || num > 255) return false;
    }
    return true;
  };

  const handleAddComputer = () => {
    if (!newComputer.ip || !newComputer.date || !newComputer.time) {
      showNotification({
        title: "Error adding computer",
        message: "Fill in all fields",
        type: "error",
      });
      return;
    }
    if (computers.find((computer) => computer.ip === newComputer.ip)) {
      showNotification({
        title: "Error adding computer",
        message: "IP already registered",
        type: "error",
      });
      return;
    }

    if (!isValidIP(newComputer.ip)) {
      showNotification({
        title: "Error adding computer",
        message: "Invalid IP",
        type: "error",
      });
      return;
    }

    const dateTime = newComputer.date
      .hour(newComputer.time.hour())
      .minute(newComputer.time.minute())
      .second(newComputer.time.second());

    setComputers([
      ...computers,
      {
        id: computers.length + 1,
        ip: newComputer.ip,
        time: dateTime.format("DD/MM/YYYY HH:mm:ss"),

        timeAdjustment: 0,
      },
    ]);
    setNewComputer({ ip: "", date: dayjs(), time: dayjs() });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="title-container">
        <Typography
          variant="h3"
          sx={{
            color: "#81c784",
            fontFamily: "'Pacifico', cursive",
            textAlign: "center",
            marginBottom: "40px",
            textShadow: "1px 16px 12px rgba(0, 0, 0, 0.8)",
          }}
        >
          SincPoint
        </Typography>
      </div>
      <div className="app-container">
        <div className="center-content">
          <div className={`server-image-container ${sync ? "syncing" : ""}`}>
            <ServerClock
              ip={computers[0].ip}
              time={computers[0].time}
              timeAdjustment={computers[0].timeAdjustment}
            />
          </div>
          <button
            onClick={handleSync}
            className="sync-button"
            style={{
              marginBottom: "20px",
            }}
          >
            Synchronize
          </button>
          {computers.length > 0 && (
            <ComputerGrid
              resetTime={resetTime}
              computers={computers.slice(1)}
              setComputers={setComputers}
              onDeleteCard={onDeleteCard}
              sync={sync}
            />
          )}
        </div>

        <div
          className="drawer-indicator"
          onMouseEnter={() => setDrawerOpen(true)}
        >
          <AddIcon fontSize="large" />
        </div>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: "250px",
              padding: "16px",
              backgroundColor: "#333",
              color: "#ffffff",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: "16px", color: "#81c784" }}
          >
            Add computer
          </Typography>
          <TextField
            label="IP"
            variant="outlined"
            name="ip"
            value={newComputer.ip}
            onChange={handleInputChange}
            fullWidth
            sx={{
              marginBottom: "16px",
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#4caf50",
                },
                "&:hover fieldset": {
                  borderColor: "#81c784",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4caf50",
                },
              },
              "& label": {
                color: "#000000",
              },
              "& label.Mui-focused": {
                color: "#000000",
              },
            }}
          />
          <TextField
            label="Date"
            type="date"
            value={newComputer.date.format("YYYY-MM-DD")}
            onChange={(e) =>
              setNewComputer((prev) => ({
                ...prev,
                date: dayjs(e.target.value),
              }))
            }
            fullWidth
            sx={{
              marginBottom: "16px",
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#4caf50",
                },
                "&:hover fieldset": {
                  borderColor: "#81c784",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4caf50",
                },
              },
              "& label": {
                color: "#000000",
              },
              "& label.Mui-focused": {
                color: "#000000",
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <TextField
              label="Hour"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 23 } }}
              value={newComputer.time.hour()}
              onChange={(e) =>
                setNewComputer((prev) => ({
                  ...prev,
                  time: prev.time.hour(Number(e.target.value)),
                }))
              }
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#4caf50",
                  },
                  "&:hover fieldset": {
                    borderColor: "#81c784",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4caf50",
                  },
                },
                "& label": {
                  color: "#000000",
                },
                "& label.Mui-focused": {
                  color: "#000000",
                },
              }}
            />
            <TextField
              label="Minute"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 59 } }}
              value={newComputer.time.minute()}
              onChange={(e) =>
                setNewComputer((prev) => ({
                  ...prev,
                  time: prev.time.minute(Number(e.target.value)),
                }))
              }
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#4caf50",
                  },
                  "&:hover fieldset": {
                    borderColor: "#81c784",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4caf50",
                  },
                },
                "& label": {
                  color: "#000000",
                },
                "& label.Mui-focused": {
                  color: "#000000",
                },
              }}
            />
            <TextField
              label="Second"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 59 } }}
              value={newComputer.time.second()}
              onChange={(e) =>
                setNewComputer((prev) => ({
                  ...prev,
                  time: prev.time.second(Number(e.target.value)),
                }))
              }
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#4caf50",
                  },
                  "&:hover fieldset": {
                    borderColor: "#81c784",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4caf50",
                  },
                },
                "& label": {
                  color: "#000000",
                },
                "& label.Mui-focused": {
                  color: "#000000",
                },
              }}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComputer}
            fullWidth
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
            }}
          >
            Add
          </Button>
        </Drawer>
      </div>
    </LocalizationProvider>
  );
}

export default App;
