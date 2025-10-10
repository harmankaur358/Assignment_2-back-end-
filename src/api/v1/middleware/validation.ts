import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema, source: "body" | "params" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = source === "body" ? req.body : req.params;
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Validation failed.Please try again",
        details: error.details.map((d) => d.message),
      });
    }
    next();
  };
};
