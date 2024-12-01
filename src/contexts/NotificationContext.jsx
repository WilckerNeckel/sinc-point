import {
    createContext,
    useCallback,
    useMemo,
    useState
  } from "react";
  
  import {
    Alert,
    AlertTitle,
    Slide,
    Snackbar,
    Typography,
    useMediaQuery,
    useTheme
  } from "@mui/material";
  
  export const NotificationContext = createContext({});
  
  const desktopAnchorOrigin = {
    horizontal: "right",
    vertical: "bottom"
  };
  
  const mobileAnchorOrigin = {
    horizontal: "center",
    vertical: "bottom"
  };
  
  function NotificationProvider({ children }) {
    const [open, setOpen] = useState(false);
  
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
  
    const [notificationProps, setNotificationProps] = useState({
      message: "",
      title: "",
      type: "info",
      anchorOrigin: desktopAnchorOrigin
    });
  
    const showNotification = useCallback(
      function showNotification({
        title,
        message,
        type,
        anchorOrigin
      }) {
        if (anchorOrigin) {
          setNotificationProps({ title, message, type, anchorOrigin });
        } else {
          setNotificationProps({
            title,
            message,
            type,
            anchorOrigin: matches ? mobileAnchorOrigin : desktopAnchorOrigin
          });
        }
  
        setOpen(true);
      },
      [matches]
    );
  
    const NotificationProviderValue = useMemo(
      () => ({ showNotification }),
      [showNotification]
    );
    
    return (
      <NotificationContext.Provider value={NotificationProviderValue}>
        {children}
  
        <Snackbar
          open={open}
          TransitionComponent={Slide}
          autoHideDuration={10000}
          onClose={() => setOpen(false)}
          anchorOrigin={notificationProps.anchorOrigin}
        >
          <Alert onClose={() => setOpen(false)} severity={notificationProps.type}>
            {notificationProps.title && (
              <AlertTitle>
                <Typography fontSize={16} fontWeight={500}>
                  {notificationProps.title}
                </Typography>
              </AlertTitle>
            )}
            <Typography fontSize={14}>{notificationProps.message}</Typography>
          </Alert>
        </Snackbar>
      </NotificationContext.Provider>
    );
  }
  
  export { NotificationProvider };
  