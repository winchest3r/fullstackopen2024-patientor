import { useState } from 'react';

import { Box, Button, Tab, Stack } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';

import patientsService from '../../../services/patients';
import { Entry, EntryType, PatientFull, Diagnosis } from '../../../types';

import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';
import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../../../../../src/types';
import { assertNever } from '../../../utils';


interface NewEntryFormProps {
  patient: PatientFull,
  setPatient: React.Dispatch<React.SetStateAction<PatientFull | null>>;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
  diagnoses: Diagnosis[];
}

const getTabType = (tab: string): string => {
  switch (tab) {
    case '1':
      return 'HealthCheck';
    case '2':
      return 'Hospital';
    case '3':
      return 'OccupationalHealthcare';
    default:
      return 'Unknown';
  }
};

const NewEntryForm = (props: NewEntryFormProps) => {
  const [hidden, setHidden] = useState(true);
  const [tab, setTab] = useState('1');

  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString());
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const [dischargeDate, setDischargeDate] = useState(new Date().toISOString());
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveCheck, setSickLeaveCheck] = useState(false);
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState(new Date().toISOString());
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState(new Date().toISOString());


  if (hidden) {
    return (
      <Box>
        <Button onClick={() => setHidden(!hidden)}>add new entry</Button>
      </Box>
    );
  }

  const submit = () => {
    const type = getTabType(tab) as EntryType;

    const baseEntry = {
      description,
      date: date.split('T')[0],
      specialist,
      diagnosisCodes,
      type
    };

    let newEntry: Entry;
    switch (baseEntry.type) {
      case 'HealthCheck':
        newEntry = {
          ...baseEntry,
          healthCheckRating: healthCheckRating
        } as HealthCheckEntry;
        break;
      case 'Hospital':
        newEntry = {
          ...baseEntry,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        } as HospitalEntry;
        break;
      case 'OccupationalHealthcare':
        newEntry = {
          ...baseEntry,
          employerName: employerName
        } as OccupationalHealthcareEntry;
        if (sickLeaveCheck) {
          newEntry = {
            ...newEntry,
            sickLeave: {
              startDate: sickLeaveStartDate.split('T')[0],
              endDate: sickLeaveEndDate.split('T')[0]
            }
          };
        }
        break;
      default:
        return assertNever(baseEntry.type);
    }

    patientsService
      .createEntry(props.patient.id, newEntry)
      .then(data => props.setPatient({
        ...props.patient,
        entries: [...props.patient.entries, data as Entry]
      }))
      .catch(error => {
        if (error instanceof Error) {
          props.setNotification(error.message);
          setTimeout(() => props.setNotification(''), 5000);
        }
      });
    
    setHidden(!hidden);

    setDescription('');
    setDate(new Date().toISOString());
    setSpecialist('');
    setDiagnosisCodes([]);

    setHealthCheckRating(0);

    setDischargeDate(new Date().toISOString());
    setDischargeCriteria('');

    setEmployerName('');
    setSickLeaveCheck(false);
    setSickLeaveStartDate(new Date().toISOString());
    setSickLeaveEndDate(new Date().toISOString());
  };

  const codes = props.diagnoses.map(d => d.code);
  codes.sort();

  return (
    <Box border="solid" borderColor="primary.light" marginBottom={1}>
      <TabContext value={tab}>
        <TabList onChange={(_e, val) => setTab(val)}>
          <Tab label='Health Check' value="1" />
          <Tab label='Hospital' value="2"/>
          <Tab label='Occupational Healthcare' value="3"/>
        </TabList>
        <Box>
          <TabPanel value="1">
            <HealthCheck 
              codes={codes}
              description={description} setDescription={setDescription}
              date={date} setDate={setDate}
              specialist={specialist} setSpecialist={setSpecialist}
              diagnosisCodes={diagnosisCodes} setDiagnosisCodes={setDiagnosisCodes}
              healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating}
            />
          </TabPanel>
          <TabPanel value="2">
            <Hospital
              codes={codes}
              description={description} setDescription={setDescription}
              date={date} setDate={setDate}
              specialist={specialist} setSpecialist={setSpecialist}
              diagnosisCodes={diagnosisCodes} setDiagnosisCodes={setDiagnosisCodes}
              dischargeDate={dischargeDate} setDischargeDate={setDischargeDate}
              dischargeCriteria={dischargeCriteria} setDischargeCriteria={setDischargeCriteria}
            />
          </TabPanel>
          <TabPanel value="3">
            <OccupationalHealthcare
              codes={codes}
              description={description} setDescription={setDescription}
              date={date} setDate={setDate}
              specialist={specialist} setSpecialist={setSpecialist}
              diagnosisCodes={diagnosisCodes} setDiagnosisCodes={setDiagnosisCodes}
              employerName={employerName} setEmployerName={setEmployerName}
              sickLeaveCheck={sickLeaveCheck} setSickLeaveCheck={setSickLeaveCheck}
              sickLeaveStartDate={sickLeaveStartDate} setSickLeaveStartDate={setSickLeaveStartDate}
              sickLeaveEndDate={sickLeaveEndDate} setSickLeaveEndDate={setSickLeaveEndDate}
            />
          </TabPanel>
          <Stack direction="row" justifyContent="space-between" alignItems="center" p={3}>
            <Button color="secondary" variant="contained" onClick={() => setHidden(!hidden)}>cancel</Button>
            <Button variant="contained" onClick={submit}>add</Button>
          </Stack>
        </Box>
      </TabContext>
    </Box>
  );
};

export default NewEntryForm;