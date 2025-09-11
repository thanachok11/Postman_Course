import mongoose, { Schema, Document } from "mongoose";

export interface IAirbnb extends Document {
    listing_url: string;
    name: string;
    summary: string;
    space: string;
    description: string;
    neighborhood_overview: string;
    notes: string;
    transit: string;
    access: string;
    interaction: string;
    house_rules: string;
    property_type: string;
    room_type: string;
    bed_type: string;
    minimum_nights: string;
    maximum_nights: string;
    cancellation_policy: string;
    last_scraped: Date;
    calendar_last_scraped: Date;
    first_review: Date;
    last_review: Date;
    accommodates: number;
    bedrooms: number;
    beds: number;
}

const AirbnbSchema: Schema = new Schema({
    listing_url: { type: String },
    name: { type: String },
    summary: { type: String },
    space: { type: String },
    description: { type: String },
    neighborhood_overview: { type: String },
    notes: { type: String },
    transit: { type: String },
    access: { type: String },
    interaction: { type: String },
    house_rules: { type: String },
    property_type: { type: String },
    room_type: { type: String },
    bed_type: { type: String },
    minimum_nights: { type: String },
    maximum_nights: { type: String },
    cancellation_policy: { type: String },
    last_scraped: { type: Date },
    calendar_last_scraped: { type: Date },
    first_review: { type: Date },
    last_review: { type: Date },
    accommodates: { type: Number },
    bedrooms: { type: Number },
    beds: { type: Number },
}, { collection: "sample_airbnb" }); 

export default mongoose.model<IAirbnb>("Listing", AirbnbSchema);
