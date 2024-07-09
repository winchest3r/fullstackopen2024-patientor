import { Box, TextField, Typography, FormControl, Slider } from '@mui/material';

interface HealthCheckProps {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string;
  healthCheckRating: number;

  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string>>;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>;
}

const HealthCheck = (props: HealthCheckProps) => {
  return (
    <Box>
      <FormControl variant="outlined" fullWidth>
        <Box padding={1}>
          <Typography marginTop={1}>Health check rating (low - good, high - bad)</Typography>
          <Slider 
            defaultValue={0} 
            min={0} 
            max={3} 
            marks 
            value={props.healthCheckRating}
            onChange={(_e, val) => props.setHealthCheckRating(val as number)}
          />
        </Box>
        <TextField
          required
          variant="standard"
          label="Description"
          value={props.description}
          onChange={e => props.setDescription(e.target.value)}
          error={props.description.length === 0}
        />
        <TextField
          required
          variant="standard"
          label="Date"
          value={props.date}
          onChange={e => props.setDate(e.target.value)}
          error={props.date.length === 0}
        />
        <TextField
          required
          variant="standard"
          label="Specialist"
          value={props.specialist}
          onChange={e => props.setSpecialist(e.target.value)}
          error={props.specialist.length === 0}
        />
        <TextField
          variant="standard"
          label="Diagnosis codes (comma separated)"
          value={props.diagnosisCodes}
          onChange={e => props.setDiagnosisCodes(e.target.value)}
        />
      </FormControl>
    </Box>
  );
};

export default HealthCheck;