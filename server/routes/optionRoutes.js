import { Router } from "express";
import { getOptions, createOption, deleteOption } from "../controllers/optionController.js";

const router = Router();

router.route("/").get(getOptions).post(createOption);
router.route("/:id").delete(deleteOption);

export default router;
