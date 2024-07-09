import { Diagnosis } from "../../types";

import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';

import NoteIcon from '@mui/icons-material/Note';

interface DiagnosesProps {
  diagnoses: Diagnosis[];
}

const Diagnoses = (props: DiagnosesProps): JSX.Element => {
  return (
    <Box>
      {props.diagnoses.length !== 0 ? <Box>
        <Divider />
        <List>
          {props.diagnoses.map(d => {
              const { code, name } = d as Diagnosis;
              return (
                <ListItem key={code}>
                  <ListItemIcon>
                    <NoteIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${code} ${name}`} />
                </ListItem>
              );
            }
          )}
        </List>
      </Box> : null}
    </Box>
  );
};

export default Diagnoses;