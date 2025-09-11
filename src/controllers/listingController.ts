import { Response } from "express";
import Listing from "../models/Airbnb";
import { AuthenticatedRequest } from "../Middleware/authMiddleware";

// Get All Listings
export const getAllListings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const listings = await Listing.find().limit(50); // จำกัดผลลัพธ์เพื่อไม่ให้หนักเกินไป
        res.status(200).json({
            message: "All listings fetched successfully",
            data: listings
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch listings", error });
    }
};

// Get Listing by ID
export const getListingById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);

        if (!listing) {
            res.status(404).json({ message: "Listing not found" });
            return;
        }

        res.status(200).json({
            message: "Listing fetched successfully",
            data: listing
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch listing", error });
    }
};

