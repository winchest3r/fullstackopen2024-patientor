import axios from "axios";
import { Patient, PatientFormValues, PatientFull } from "../types";

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

export default {
  getAll, create, getPatient
};

