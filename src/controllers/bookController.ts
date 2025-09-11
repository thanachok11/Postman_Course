// controllers/bookController.ts
import { Request, Response } from "express";
import Book, { IBook } from "../models/Book";

// ✅ GET /books - ดึงหนังสือทั้งหมด
export const getBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const books: IBook[] = (await Book.find()).map(book => book.toObject() as IBook);
        res.status(200).json(books); // ส่งเป็น array ตรง ๆ
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch books", error });
    }
};

// ✅ GET /books/:id - ดึงหนังสือตาม ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
        const book: IBook | null = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        res.status(200).json(book.toObject());
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch book", error });
    }
};

// ✅ POST /books - สร้างหนังสือใหม่ (รับเฉพาะ array เท่านั้น)
export const createBook = async (req: Request, res: Response) => {
    const data = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ message: "ข้อมูลต้องเป็น array ของ object เท่านั้น" });
    }

    // ตรวจสอบ validation ของแต่ละ object
    for (const book of data) {
        if (
            typeof book.title !== "string" ||
            typeof book.author !== "string" ||
            typeof book.year !== "number"
        ) {
            return res.status(400).json({
                message: "title, author ต้องเป็น string และ year ต้องเป็น number",
            });
        }
    }

    try {
        const newBooksDocs = await Book.insertMany(data);
        const newBooks: IBook[] = newBooksDocs.map(doc => doc.toObject() as IBook);
        res.status(201).json(newBooks); // ส่ง array ตรง ๆ
    } catch (error) {
        res.status(500).json({ message: "Failed to create books", error });
    }
};

// ✅ PUT /books/:id - อัปเดตหนังสือตาม ID
export const updateBook = async (req: Request, res: Response): Promise<void> => {
    const { title, author, year } = req.body;

    if (
        (title && typeof title !== "string") ||
        (author && typeof author !== "string") ||
        (year && typeof year !== "number")
    ) {
        res.status(400).json({
            message: "title, author ต้องเป็น string และ year ต้องเป็น number",
        });
        return;
    }

    try {
        const updatedBook: IBook | null = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, year },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            res.status(404).json({ message: "Book not found" });
            return;
        }

        res.status(200).json(updatedBook.toObject());
    } catch (error) {
        res.status(500).json({ message: "Failed to update book", error });
    }
};

// ✅ DELETE /books/:id - ลบหนังสือตาม ID
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedBook: IBook | null = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            res.status(404).json({ message: "Book not found" });
            return;
        }

        res.status(200).json(deletedBook.toObject());
    } catch (error) {
        res.status(500).json({ message: "Failed to delete book", error });
    }
};
