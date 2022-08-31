import { Express, request, Request, response, Response } from "express";
import {
  createVaccineHandler,
  getVaccineHandler,
  getAllVaccineHandler,
  updateVaccineHandler,
  deleteVaccineHandler,
} from "./controller/vaccine.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createVaccineSchema,
  deleteVaccineSchema,
  getVaccineSchema,
  updateVaccineSchema,
} from "./schema/vaccine.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/signup", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/signin",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/sessions", requireUser, getUserSessionsHandler);

  app.delete("/signout", requireUser, deleteSessionHandler);

  app.post(
    "/vaccine",
    [requireUser, validateResource(createVaccineSchema)],
    createVaccineHandler
  );

  /**
   * @openapi
   * '/api/vaccines/{vaccineId}':
   *  get:
   *     tags:
   *     - Vaccines
   *     summary: Get a single vaccine by the vaccineId
   *     parameters:
   *      - name: vaccineId
   *        in: path
   *        description: The id of the vaccine
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Vaccine'
   *       404:
   *         description: Vaccine not found
   */
  app.put(
    "/vaccine/:vaccineId",
    [validateResource(updateVaccineSchema)],
    updateVaccineHandler
  );

  app.get(
    "/vaccine/:vaccineId",
    [requireUser, validateResource(getVaccineSchema)],
    getVaccineHandler
  );

  app.get(
    "/vaccine",
    // validateResource(getVaccineSchema),
    requireUser,
    getAllVaccineHandler
  );

  app.delete(
    "/vaccine/:vaccineId",
    [requireUser, validateResource(deleteVaccineSchema)],
    deleteVaccineHandler
  );
}

export default routes;
