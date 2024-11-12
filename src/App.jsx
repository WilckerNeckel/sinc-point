import React, { useState } from "react";
import ComputerGrid from "./components/computer/ComputerGrid";
import ServerClock from "./components/server/ServerClock";
import { Drawer, Box, TextField, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "./App.css";

function App() {
  const [sync, setSync] = useState(false);
  const [resetTime, setResetTime] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [computers, setComputers] = useState([]);
  const [newComputer, setNewComputer] = useState({
    ip: "",
    date: dayjs(),
    time: dayjs(),
  });

  const handleSync = () => {
    setSync(true);
    setResetTime(false);

    // Temporizador para desativar o efeito de sincronização
    setTimeout(() => {
      setSync(false);
      setResetTime(true);
    }, 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComputer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComputer = () => {
    if (newComputer.ip && newComputer.date && newComputer.time) {
      const dateTime = newComputer.date
        .hour(newComputer.time.hour())
        .minute(newComputer.time.minute())
        .second(newComputer.time.second());
      setComputers([
        ...computers,
        {
          id: computers.length + 1,
          ip: newComputer.ip,
          time: dateTime.format("YYYY-MM-DDTHH:mm:ss"),
          timeAdjustment: 0,
        },
      ]);
      setNewComputer({ ip: "", date: dayjs(), time: dayjs() });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="app-container">
        <div className="center-content">
          <div className={`server-image-container ${sync ? "syncing" : ""}`}>
            <ServerClock resetTime={resetTime} timeAdjustment={5} />
          </div>
          <button onClick={handleSync} className="sync-button">
            Sincronizar
          </button>
          {computers.length > 0 && (
            <ComputerGrid resetTime={resetTime} computers={computers} />
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
            Adicionar Computador
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
                  borderColor: "#4caf50", // Sempre verde quando focado
                },
              },
              "& label": {
                color: "#000000", // Cor preta para o label
              },
              "& label.Mui-focused": {
                color: "#000000", // Cor preta para o label quando focado
              },
            }}
          />
          <TextField
            label="Data"
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
                color: "#000000", // Cor preta para o label
              },
              "& label.Mui-focused": {
                color: "#000000", // Cor preta para o label quando focado
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
              label="Hora"
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
              label="Minuto"
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
              label="Segundo"
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
            Adicionar
          </Button>
        </Drawer>
      </div>
    </LocalizationProvider>
  );
}

export default App;
