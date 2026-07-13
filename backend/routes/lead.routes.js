import { Router } from "express";

import {  getLead, createLead, updateLead, deletLead, reorderLeads, getLeads } from "../controllers/lead.controllers.js";

import { protect } from "../middleware/auth.middleware.js";

const router = Router();
router.use(protect);
router.patch("/reader", reorderLeads);
router.route("/").get(getLeads).post(createLead);
router.route("/:id").get(getLead).put(updateLead).delete(deletLead);

export default router