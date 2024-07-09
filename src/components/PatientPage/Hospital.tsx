import { Entry } from "../../types";

import { Typography, Box } from "@mui/material";

interface EntryProps {
  entry: Entry;
}

const Hospital = (props: EntryProps): JSX.Element => {
  if (props.entry.type !== 'Hospital') {
    return <Typography>Wrong entry type</Typography>;
  }

  return (
    <Box>
      <Typography>
        Discharge date: {props.entry.discharge.date}, criteria:<br />
        <i>{props.entry.discharge.criteria}</i>
      </Typography>
    </Box>
  );
};

export default Hospital;