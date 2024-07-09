import { Box, TextField, Checkbox, FormControl, FormControlLabel } from '@mui/material';

interface OccupationalHealthcareProps {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string;
  employerName: string;
  sickLeaveCheck: boolean;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;

  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string>>;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  setSickLeaveCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setSickLeaveStartDate: React.Dispatch<React.SetStateAction<string>>;
  setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcare = (props: OccupationalHealthcareProps) => {
  return (
    <Box>
      <FormControl variant="outlined" fullWidth>
        <TextField
          required
          variant="standard"
          label="Employer"
          value={props.employerName}
          onChange={e => props.setEmployerName(e.target.value)}
          error={props.employerName.length === 0}
        />
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
        <FormControlLabel 
          control={
            <Checkbox 
              checked={props.sickLeaveCheck}
              onChange={(_e, val) => props.setSickLeaveCheck(val)}/>
          }
          label="Sick Leave"
        />
        {props.sickLeaveCheck ? <FormControl>
          <TextField
            required
            variant="standard"
            label="Start Date"
            value={props.sickLeaveStartDate}
            onChange={e => props.setSickLeaveStartDate(e.target.value)}
            error={props.sickLeaveStartDate.length === 0}
          />
          <TextField
            required
            variant="standard"
            label="End Date"
            value={props.sickLeaveEndDate}
            onChange={e => props.setSickLeaveEndDate(e.target.value)}
            error={props.sickLeaveEndDate.length === 0}
          />
        </FormControl> : null}
      </FormControl>
    </Box>
  );
};

export default OccupationalHealthcare;