import React, { useState } from "react";
import ComputerGrid from "./components/computer/ComputerGrid";
import ServerClock from "./components/server/ServerClock";
import { Drawer, Box, TextField, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
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
        .minute(newComputer.time.minute());
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
              },
            }}
          />
          <DatePicker
            label="Data"
            value={newComputer.date}
            onChange={(newDate) =>
              setNewComputer((prev) => ({ ...prev, date: newDate }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
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
                  },
                }}
              />
            )}
          />
          <TimePicker
            label="Hora"
            value={newComputer.time}
            onChange={(newTime) =>
              setNewComputer((prev) => ({ ...prev, time: newTime }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
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
                  },
                }}
              />
            )}
          />
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
