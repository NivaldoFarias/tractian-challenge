import express from "express";

import companiesRouter from "./company.route";
import sessionRouter from "./session.route";
import usersRouter from "./user.route";
import unitsRouter from "./unit.route";

const router = express.Router();

router.use("/companies", companiesRouter);
router.use("/auth", sessionRouter);
router.use("/users", usersRouter);
router.use("/units", unitsRouter);

export default router;
