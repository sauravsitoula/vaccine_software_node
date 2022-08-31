import { object, number, string, TypeOf, boolean } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Vaccine:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(20, "Description should be at least 20 characters long"),
    dose: number({
      required_error: "Dose is required",
    }),
    mandatory: boolean({
      required_error: "Mandatory is required"
    }),
    image: string({
      required_error: "Image is required",
    }),
  }),
};

const params = {
  params: object({
    vaccineId: string({
      required_error: "vaccineId is required",
    }),
  }),
};

export const createVaccineSchema = object({
  ...payload,
});

export const updateVaccineSchema = object({
  ...payload,
  ...params,
});

export const deleteVaccineSchema = object({
  ...params,
});

export const getVaccineSchema = object({
  ...params,
});

export type CreateVaccineInput = TypeOf<typeof createVaccineSchema>;
export type UpdateVaccineInput = TypeOf<typeof updateVaccineSchema>;
export type ReadVaccineInput = TypeOf<typeof getVaccineSchema>;
export type DeleteVaccineInput = TypeOf<typeof deleteVaccineSchema>;
