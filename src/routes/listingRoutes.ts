import express from "express";
import { getAllListings, getListingById } from "../controllers/listingController";
import { verifyToken } from "../Middleware/authMiddleware";

const router = express.Router();

// ต้อง login ก่อนถึงจะใช้ได้
router.get("/", verifyToken, getAllListings);
router.get("/:id", verifyToken, getListingById);

export default router;
