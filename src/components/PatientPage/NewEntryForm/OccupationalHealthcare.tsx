import {
  Box,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput
} from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface OccupationalHealthcareProps {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  employerName: string;
  sickLeaveCheck: boolean;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;

  codes: string[];

  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
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
        <Stack marginTop={3} marginBottom={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={dayjs(props.date)}
              onChange={(val) => props.setDate(val!.toISOString())}
            />
          </LocalizationProvider>
        <TextField
          required
          variant="standard"
          label="Specialist"
          value={props.specialist}
          onChange={e => props.setSpecialist(e.target.value)}
          error={props.specialist.length === 0}
        />
        </Stack>
        <FormControl>
          <InputLabel id="hospital-diagnosis-codes-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="hospital-diagnosis-codes-label"
            multiple
            value={props.diagnosisCodes}
            onChange={e => props.setDiagnosisCodes(e.target.value as string[])}
            input={<OutlinedInput label="Diagnosis Codes"/>}
          >
            {props.codes.map(code => 
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>)}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox 
              checked={props.sickLeaveCheck}
              onChange={(_e, val) => props.setSickLeaveCheck(val)}/>
          }
          label="Sick Leave"
        />
        {props.sickLeaveCheck ? <FormControl>
          <Stack marginTop={2} spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Sick Leave Start Date"
                value={dayjs(props.sickLeaveStartDate)}
                onChange={(val) => props.setSickLeaveStartDate(val!.toISOString())}
              />
              <DatePicker
                label="Sick Leave End Date"
                value={dayjs(props.sickLeaveEndDate)}
                onChange={(val) => props.setSickLeaveEndDate(val!.toISOString())}
              />
            </LocalizationProvider>
          </Stack>
        </FormControl> : null}
      </FormControl>
    </Box>
  );
};

export default OccupationalHealthcare;