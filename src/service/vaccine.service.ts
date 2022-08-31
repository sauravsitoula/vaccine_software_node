import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import VaccineModel, {
  VaccineDocument,
  VaccineInput,
} from "../models/vaccine.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createVaccine(input: VaccineInput) {
  const metricsLabels = {
    operation: "createVaccine",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await VaccineModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findVaccine(
  query: FilterQuery<VaccineDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findVaccine",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await VaccineModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAllVaccine(
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findAllVaccine",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await VaccineModel.find({}, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdateVaccine(
  query: FilterQuery<VaccineDocument>,
  update: UpdateQuery<VaccineDocument>,
  options: QueryOptions
) {
  return VaccineModel.findOneAndUpdate(query, update, options);
}

export async function deleteVaccine(query: FilterQuery<VaccineDocument>) {
  return VaccineModel.deleteOne(query);
}
