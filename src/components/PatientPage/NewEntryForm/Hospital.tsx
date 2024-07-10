import { Box, TextField, FormControl, Stack, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface HospitalProps {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  dischargeDate: string;
  dischargeCriteria: string;

  codes: string[];

  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
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
        <Stack marginTop={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Discharge Date"
              value={dayjs(props.dischargeDate)}
              onChange={(val) => props.setDischargeDate(val!.toISOString())}
            />
          </LocalizationProvider>
        </Stack>
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