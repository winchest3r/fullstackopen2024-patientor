import { Box, TextField, FormControl } from '@mui/material';

interface HospitalProps {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string;
  dischargeDate: string;
  dischargeCriteria: string;

  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string>>;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const Hospital = (props: HospitalProps) => {
  return (
    <Box>
      <FormControl variant="outlined" fullWidth>
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
        <TextField
          required
          variant="standard"
          label="Discharge Date"
          value={props.dischargeDate}
          onChange={e => props.setDischargeDate(e.target.value)}
          error={props.dischargeDate.length === 0}
        />
        <TextField
          required
          variant="standard"
          label="Discharge Criteria"
          value={props.dischargeCriteria}
          onChange={e => props.setDischargeCriteria(e.target.value)}
          error={props.dischargeCriteria.length === 0}
        />
      </FormControl>
    </Box>
  );
};

export default Hospital;