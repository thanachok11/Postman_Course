import express from "express";
import type { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// ตัวอย่าง Database แบบง่าย
interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
}

let books: Book[] = [
    { id: 1, title: "Intro to Programming", author: "John Doe", year: 2022 },
    { id: 2, title: "Advanced JS", author: "Jane Doe", year: 2023 },
];

// GET /books
app.get("/books", (req: Request, res: Response) => {
    res.json(books);
});

// GET /books/:id
app.get("/books/:id", (req: Request, res: Response) => {
    const book = books.find(b => b.id === parseInt(req.params.id ?? ""));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

// POST /books
app.post("/books", (req: Request, res: Response) => {
    const newBook: Book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id
app.put("/books/:id", (req: Request, res: Response) => {
    const book = books.find(b => b.id === parseInt(req.params.id ?? ""));
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.year = req.body.year || book.year;

    res.json(book);
});

// DELETE /books/:id
app.delete("/books/:id", (req: Request, res: Response) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id ?? ""));
    if (index === -1) return res.status(404).json({ message: "Book not found" });

    const deletedBook = books.splice(index, 1);
    res.json(deletedBook[0]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
