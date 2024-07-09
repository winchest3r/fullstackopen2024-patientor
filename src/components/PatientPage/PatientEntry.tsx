import { useEffect, useState } from 'react';

import diagnosesService from '../../services/diagnoses';

import { Entry, Diagnosis, EntryType } from "../../types";
import { assertNever } from '../../utils';

import { Typography, Box, Stack, Divider } from "@mui/material";

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkIcon from '@mui/icons-material/Work';
import NotesIcon from '@mui/icons-material/Notes';

import Diagnoses from './Diagnoses';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';
import Hospital from './Hospital';

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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography>
          {props.entry.date} <Icon type={props.entry.type} />
        </Typography>
        <Typography>
          diagnosed by {props.entry.specialist}
        </Typography>
      </Stack>
      <Typography>
        <i>{props.entry.description}</i>
      </Typography>
      <Divider />
    </Box>
  );
};


const PatientEntry = (props: EntryProps): JSX.Element => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosesService
      .getAll()
      .then(data => {
        setDiagnoses(data);
      });
  }, []);

  if (diagnoses.length === 0) {
    return <Typography>loading...</Typography>;
  }

  const populatedDiagnoses: Diagnosis[] = props.entry.diagnosisCodes ? props.entry.diagnosisCodes.map(code => {
    return diagnoses.find(d => d.code === code) as Diagnosis;
  }) : [];

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
          <BaseEntryData entry={props.entry} />
          <HealthCheck entry={props.entry} />
          <Diagnoses diagnoses={populatedDiagnoses} />
        </Box>
      );
    case 'Hospital':
      return (
        <Box sx={style}>
          <BaseEntryData entry={props.entry} />
          <Hospital entry={props.entry} />
          <Diagnoses diagnoses={populatedDiagnoses} />
        </Box>
      );
      case 'OccupationalHealthcare':
        return (
          <Box sx={style}>
            <BaseEntryData entry={props.entry} />
            <OccupationalHealthcare entry={props.entry} />
            <Diagnoses diagnoses={populatedDiagnoses} />
          </Box>
        );
    default:
      return assertNever(props.entry);
  }
};

export default PatientEntry;
