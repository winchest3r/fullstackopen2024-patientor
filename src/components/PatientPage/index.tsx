import { useParams } from 'react-router-dom';

import { Patient } from '../../types';
import { Box, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface PatientPageProps {
  patients: Patient[]
}

const PatientPage = (props: PatientPageProps): JSX.Element => {
  const { id } = useParams();

  const patient = props.patients.find(p => p.id === id);

  if (!patient) {
    return <div>Sorry. Can't find this patient.</div>;
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
      </Box>
    </div>
  );
};

export default PatientPage;