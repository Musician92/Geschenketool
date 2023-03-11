import express from "express";

import {
    createPresent,
    deletePresent,
    getAllPresents,
    getPresentDetail,
    updatePresent,
} from "../controllers/sarah.controller.js";

const router = express.Router();

router.route("/").get(getAllPresents);
router.route("/:id").get(getPresentDetail);
router.route("/").post(createPresent);
router.route("/:id").patch(updatePresent);
router.route("/:id").delete(deletePresent);

export default router;