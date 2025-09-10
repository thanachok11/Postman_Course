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

app.get("/", (req: Request, res: Response) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>POSTMAN COURSE API</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(to right, #4facfe, #00f2fe);
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                h1 {
                    font-size: 3rem;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                }
                p {
                    font-size: 1.2rem;
                    margin-top: 1rem;
                }
                a {
                    color: #fff;
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div>
                <h1>This API for Test POSTMAN COURSE</h1>
                <p>Use the endpoints below:</p>
                <ul>
                    <a href="/books">GET /books</a></li>
                    GET /books/:id</li>
                    POST /books</li>
                    PUT /books/:id</li>
                    DELETE /books/:id</li>
                </ul>
            </div>
        </body>
        </html>
    `);
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
