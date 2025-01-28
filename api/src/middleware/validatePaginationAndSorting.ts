import { Request, Response, NextFunction } from "express";

const { query, validationResult } = require("express-validator");

export const validatePaginationAndSorting = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer."),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer."),
  query("sortBy")
    .optional()
    .isIn([
      "firstName",
      "lastName",
      "birthDate",
      "createdAt",
      "updatedAt",
    ])
    .withMessage(
      "SortBy must be one of 'firstName', 'lastName', 'birthDate', 'createdAt', or 'updatedAt'"
    ),
  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be either 'asc' or 'desc'"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
