import express from "express";
const app = express();

app.use(express.json());

import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import noteRouter from "./routes/note.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/notes", noteRouter);

//example route: http://localhost:5000/api/v1/users/register

export default app;