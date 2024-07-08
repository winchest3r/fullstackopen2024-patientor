import { useEffect, useState } from 'react';

import diagnosesService from '../../services/diagnoses';

import { Entry, Diagnosis, EntryType } from "../../types";

import { Typography, Box, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";

import NoteIcon from '@mui/icons-material/Note';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkIcon from '@mui/icons-material/Work';
import NotesIcon from '@mui/icons-material/Notes';

interface EntryProps {
  entry: Entry;
}

interface IconProps {
  type: EntryType;
}

const Icon = (props: IconProps): JSX.Element => {
  switch (props.type) {
    case 'HealthCheck':
      return <LocalHospitalIcon />;
    case 'Hospital':
      return <MedicalInformationIcon />;
    case 'OccupationalHealthcare':
      return <WorkIcon />;
    default:
      return <NotesIcon />;
  }
};

const BaseEntryData = (props: EntryProps) => {
  return (
    <Box>
      <Typography>
        {props.entry.date} <Icon type={props.entry.type} />
      </Typography>
      <Typography>
        <i>{props.entry.description}</i>
      </Typography>
    </Box>
  );
};

const Diagnoses = (props: EntryProps): JSX.Element => {
  return (
    <Box>
      <Divider />
      {props.entry.diagnosisCodes ? <List>
        {props.entry.diagnosisCodes.map(d => {
            const { code, name } = d as Diagnosis;
            console.log(d);
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
      </List> : null}
    </Box>
  );
};

const PatientEntry = (props: EntryProps): JSX.Element => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosesService
      .getAll()
      .then(data => setDiagnoses(data));
  }, []);

  /* eslint-disable */
  let populatedEntry = props.entry;
  if (populatedEntry.diagnosisCodes) {
    populatedEntry = {
      ...populatedEntry,
      diagnosisCodes: props.entry.diagnosisCodes!.map(c => {
        return {
          ...diagnoses.find(d => d.code === c)
        };
      }) as Diagnosis[]
    };
  }

  const style = { 
    border: 'solid',
    borderRadius: 1,
    borderColor: 'primary.light',
    marginBottom: 1,
    padding: 1,
  };

  switch (props.entry.type) {
    case 'HealthCheck':
      return (
        <Box sx={style}>
          <BaseEntryData entry={populatedEntry} />
          <Typography>HealthCheck</Typography>
          <Diagnoses entry={populatedEntry} />
        </Box>
      );
    case 'Hospital':
      return (
        <Box sx={style}>
          <BaseEntryData entry={populatedEntry} />
          <Typography>Hospital</Typography>
          <Diagnoses entry={populatedEntry} />
        </Box>
      );
    case 'OccupationalHealthcare':
      return (
        <Box sx={style}>
          <BaseEntryData entry={populatedEntry} />
          <Typography>OccupationalHealthcare</Typography>
          <Diagnoses entry={populatedEntry} />
        </Box>
      );
    default:
      return (
        <Box sx={style}>
          <BaseEntryData entry={populatedEntry} />
          <Typography>Base</Typography>
          <Diagnoses entry={populatedEntry} />
        </Box>
      );
  }
};

export default PatientEntry;
