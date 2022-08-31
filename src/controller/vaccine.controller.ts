import { Request, Response } from "express";
import {
  CreateVaccineInput,
  UpdateVaccineInput,
} from "../schema/vaccine.schema";
import {
  createVaccine,
  deleteVaccine,
  findAndUpdateVaccine,
  findVaccine,
  findAllVaccine
} from "../service/vaccine.service";

export async function createVaccineHandler(
  req: Request<{}, {}, CreateVaccineInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const vaccine = await createVaccine({ ...body, user: userId });

  return res.send(vaccine);
}

export async function updateVaccineHandler(
  req: Request<UpdateVaccineInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const vaccineId = req.params.vaccineId;
  const update = req.body;

  const vaccine = await findVaccine({ vaccineId });

  if (!vaccine) {
    return res.sendStatus(404);
  }

  if (String(vaccine.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedVaccine = await findAndUpdateVaccine({ vaccineId }, update, {
    new: true,
  });

  return res.send(updatedVaccine);
}

export async function getVaccineHandler(
  req: Request<UpdateVaccineInput["params"]>,
  res: Response
) {
  const vaccineId = req.params.vaccineId;
  const vaccine = await findVaccine({ vaccineId });

  if (!vaccine) {
    return res.sendStatus(404);
  }

  return res.send(vaccine);
}

export async function getAllVaccineHandler(
  req: Request<UpdateVaccineInput["params"]>,
  res: Response
) {
  // console.log(res)
  // const vaccineId = req.params.vaccineId;
  const vaccines = await findAllVaccine();

  if (!vaccines) {
    return res.sendStatus(404);
  }

  return res.send(vaccines);
}

export async function deleteVaccineHandler(
  req: Request<UpdateVaccineInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const vaccineId = req.params.vaccineId;

  const vaccine = await findVaccine({ vaccineId });

  if (!vaccine) {
    return res.sendStatus(404);
  }

  if (String(vaccine.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteVaccine({ vaccineId });

  return res.sendStatus(200);
}
