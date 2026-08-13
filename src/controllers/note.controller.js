import { Note } from "../models/note.model.js";
 const createNote = async (req, res) => {
     try {
         const { title, content } = req.body;

         if (!title || !content) {
             return res.status(400).json({
                 message: "Title and Content Are Required"
             });
         }

         const note = await Note.create({
             title,
             content,
             owner: req.user._id
         });

         res.status(201).json({
             message: "Note Created Successfully",
             note
         });
     } catch (error) {
         return res.status(500).json({
             message: "Internal Server Error",
             error: error.message
         });

     }
 }
 const getAllNote = async (req, res) => {
     try {
         const notes = await Note.find({
             owner: req.user._id
         }).sort({
             createdAt: -1
         });
         res.status(200).json({
             count: notes.length,
             notes
         });
     } catch (error) {
         return res.status(500).json({
             message: "Internal Server Error",
             error: error.message
         });
     }
 }
 const getOneNote = async (req, res) =>  {
     try {
         const note = await Note.findById(req.params.id);
         if (!note) {
             return res.status(404).json({
                 message: "Note Not Found"
             });
         }
         if (note.owner.toString() !== req.user._id.toString()) {
             return res.status(403).json({
                 message: "Not Authorized To Access This Note"
             });
         }
         res.status(200).json({ note });
     } catch (error) {
         return res.status(500).json({
             message: "Internal Server Error",
             error: error.message
         })
     }
 }
 const updateNote = async (req, res) => {
     try {
         const note = await Note.findById(req.params.id);
         if (!note) {
             return res.status(400).json({
                 message: "Note Not Found"
             });
         }
         if (note.owner.toString() !== req.user._id.toString()) {
                 return res.status(403).json({
                     message: "Not Authorized To Access This Note"
                 });
             }

         const { title, content } = req.body;
         if (title) note.title = title;
         if (content) note.content = content;

         await note.save();

         res.status(200).json({
             message: "Note Updated Successfully", note
         });
     } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
     }
 }
 const deleteNote = async (req, res) => {
     try {
         const note = await Note.findById(req.params.id);
         if (!note) {
             return res.status(404).json({
                 message: "Note Not Found"
             });
         }
         if (note.owner.toString() !== req.user._id.toString()) {
             return res.status(403).json({
                 message: "Not Authorized To Delete This Note"
             });
         }
         await note.deleteOne();
         res.status(200).json({
             message: "Note Deleted Successfully"
         });
     } catch (error) {
         return res.status(500).json({
             message: "Internal Server Error",
             error: error.message
         });
     }
 }
 export { createNote, getAllNote, getOneNote, updateNote, deleteNote };