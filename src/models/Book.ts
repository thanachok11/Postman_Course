// models/Book.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: string;
    year: number;
}

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        year: { type: Number, required: true },
    },
    {
        timestamps: true, // เพิ่ม createdAt, updatedAt ให้อัตโนมัติ
    }
);

export default mongoose.model<IBook>("Book", BookSchema);
