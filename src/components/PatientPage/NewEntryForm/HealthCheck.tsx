import { Box, TextField, Typography, FormControl, Slider, Stack, InputLabel, OutlinedInput, Select, MenuItem } from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface HealthCheckProps {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  healthCheckRating: number;

  codes: string[];

  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
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
          <InputLabel id="healthcheck-diagnosis-codes-label">Diagnosis Codes</InputLabel>
            <Select
              labelId="healthcheck-diagnosis-codes-label"
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
      </FormControl>
    </Box>
  );
};

export default HealthCheck;