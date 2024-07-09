import { Alert, Box } from '@mui/material';

interface NotificationProps {
  notificaiton: string;
}

const Notification = (props: NotificationProps) => {
  if (props.notificaiton.length === 0) {
    return null;
  }

  return (
    <Box marginTop={1} marginBottom={1}>
      <Alert severity="error">{props.notificaiton}</Alert>
    </Box>
  );
};

export default Notification;