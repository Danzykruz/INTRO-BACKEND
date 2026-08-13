import { Router } from "express";
import {createNote, deleteNote, getAllNote, getOneNote, updateNote} from "../controllers/note.controller.js";
import { protect} from "../middleware/auth.middleware.js";
  const router = Router();

  router.route("/").post(protect, createNote).get(protect, getAllNote);
  router.route("/:id").get(protect, getOneNote).patch(protect, updateNote).delete(protect, deleteNote);

  export default router;