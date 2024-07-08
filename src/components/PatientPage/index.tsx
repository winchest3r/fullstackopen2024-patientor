import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PatientFull } from '../../types';
import patientsService from '../../services/patients';


import PatientEntry from './PatientEntry';

import { Box, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientPage = (): JSX.Element => {
  const params = useParams();
  const [patient, setPatient] = useState<PatientFull | null>(null);
  

  useEffect(() => {
    patientsService
      .getPatient(params.id as string)
      .then(data => setPatient(data));
  }, [params.id]);

  if (!patient) {
    return (
      <Typography variant="h6" style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
        Sorry. Can't find this patient.
      </Typography>
    );
  }

  return (
    <div className="App">
      <Box>
        <Typography variant="h5" style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
          <strong>{patient.name}</strong> {{
            male: <MaleIcon />,
            female: <FemaleIcon />,
            other: <TransgenderIcon />
            }[patient.gender]}
        </Typography>
        <Typography>
          ssn: {patient.ssn ? patient.ssn : 'none'}<br />
          occupation: {patient.occupation}
        </Typography>
        <Typography variant="h6" style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
          entries
        </Typography>
        <Box>
          {patient.entries.length === 0 ? <div>no entries</div> : 
            patient.entries.map(e => {
              return <PatientEntry key={e.id} entry={e} />;
            })
          }
        </Box>
      </Box>
    </div>
  );
};

export default PatientPage;