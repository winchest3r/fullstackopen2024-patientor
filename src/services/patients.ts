import axios from "axios";
import { Entry, Patient, PatientFormValues, PatientFull } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async(id: string) => {
  const response = await axios.get<PatientFull>(
    `${apiBaseUrl}/patients/${id}`
  );

  return response.data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (id: string, object: Entry) => {
  try {
    const response = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, object);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
};

export default {
  getAll, create, getPatient, createEntry
};

