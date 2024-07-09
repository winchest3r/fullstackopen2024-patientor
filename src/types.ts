import { 
  Patient as BackendPatient, 
  Entry as BackendEntry,
} from '../../src/types';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type PatientFull = BackendPatient;

export type Entry = BackendEntry;

export type PatientFormValues = Omit<Patient, "id" | "entries">;