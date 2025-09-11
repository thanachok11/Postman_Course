import express from "express";
import type { Request, Response } from "express";
import bodyParser from "body-parser";
import connectDB from './utils/database';
import dotenv from 'dotenv';
import listingRoutes from "./routes/listingRoutes";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";


const app = express();
const PORT = Number(process.env.PORT) || 5000;

// เชื่อมต่อ MongoDB
connectDB();
dotenv.config();
app.use(bodyParser.json());
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
                }
                .container {
                    max-width: 900px;
                    text-align: center;
                    background: rgba(0, 0, 0, 0.4);
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
                }
                h1 {
                    font-size: 2.5rem;
                    margin-bottom: 10px;
                    text-shadow: 2px 2px 6px rgba(0,0,0,0.4);
                }
                section {
                    margin: 20px 0;
                    text-align: left;
                }
                h2 {
                    font-size: 1.5rem;
                    margin-bottom: 10px;
                    border-bottom: 2px solid #fff;
                    padding-bottom: 5px;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    background: rgba(255, 255, 255, 0.1);
                    margin: 8px 0;
                    padding: 10px;
                    border-radius: 8px;
                }
                code {
                    background: rgba(0,0,0,0.6);
                    padding: 3px 6px;
                    border-radius: 5px;
                    font-family: monospace;
                }
                .auth {
                    color: #ffd700;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📚 POSTMAN COURSE API</h1>
                <p>Welcome! Here are the available endpoints grouped by module:</p>
                <ul>
                    <li><code>GET /books </code> → Get All books</li>
                    <li><code>GET /books/:id</code> → Get book by ID</li>
                    <li><code>POST /books</code> → Add a new book</li>
                    <li><code>PUT /books/:id</code> → Update book by ID</li>
                    <li><code>DELETE /books/:id</code> → Delete book by ID</li>
                </ul>
                <section>
                    <h2>🔐 Authentication & Users</h2>
                    <ul>
                        <li><code>POST /auth/register</code> → Register new user (no auth)</li>
                        <li><code>POST /auth/login</code> → Login & receive JWT token</li>
                        <li><code>GET /auth/users</code> → Get all users <span class="auth">(Auth Required)</span></li>
                    </ul>
                </section>

                <section>
                    <h2>🏘️ Airbnb Listings</h2>
                    <ul>
                        <li><code>GET /airbnb</code> → Get all listings (limit 50) <span class="auth">(Auth Required)</span></li>
                        <li><code>GET /airbnb/:id</code> → Get single listing by ID <span class="auth">(Auth Required)</span></li>
                    </ul>
                </section>

                <p style="margin-top:20px;">⚠️ All protected routes require sending <code>Authorization: Bearer &lt;token&gt;</code></p>
            </div>
        </body>
        </html>
    `);
});


app.use("/api/airbnb", listingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
