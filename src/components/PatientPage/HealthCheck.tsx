import { Entry } from "../../types";

import { Typography, Box } from "@mui/material";

interface EntryProps {
  entry: Entry;
}

const HealthCheck = (props: EntryProps): JSX.Element => {
  if (props.entry.type !== 'HealthCheck') {
    return <Typography>Wrong entry type</Typography>;
  }

  const getHealthCheckRating = (value: number): string => {
    switch (value) {
      case 0:
        return 'high, no any problems';
      case 1:
        return 'medium, minimal or no health problems';
      case 2:
        return 'low, minor health problems';
      case 3:
        return 'poor, major health problems';
      default:
        return 'unknown';
    }
  };

  return (
    <Box>
      <Typography>
        Health check rating: {getHealthCheckRating(props.entry.healthCheckRating)}.
      </Typography>
    </Box>
  );
};

export default HealthCheck;