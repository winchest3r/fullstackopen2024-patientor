import { Entry } from "../../types";

import { Typography, Box } from "@mui/material";

interface EntryProps {
  entry: Entry;
}

const OccupationalHealthcare = (props: EntryProps): JSX.Element => {
  if (props.entry.type !== 'OccupationalHealthcare') {
    return <Typography>Wrong entry type</Typography>;
  }

  return (
    <Box>
      <Typography>
        Occupational healthcare: {props.entry.employerName}.
      </Typography>
      {props.entry.sickLeave ? <Typography>
        Sick leave period: {props.entry.sickLeave.startDate} - {props.entry.sickLeave.endDate} (inclusive).
      </Typography> : null}
    </Box>
  );
};

export default OccupationalHealthcare;