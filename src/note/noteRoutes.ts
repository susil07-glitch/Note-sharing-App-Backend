
import express from "express"
import {createNote ,deleteNote, featchingSingleNote, fetchNotes, updateNote} from "./noteController"


const noteRoute= express.Router()

import {multer,storage} from "./../MiddleWares/multerMiddleWare"

const upload =multer({storage:storage})

noteRoute.route("/create").post( upload.single("file"),createNote)
noteRoute.route("/delete/:id").delete(deleteNote)
noteRoute.route("/update/:id").patch(upload.single("file"),updateNote)
noteRoute.route("/getNotes").get(fetchNotes)
noteRoute.route("/singleNote/:id").get(featchingSingleNote)


export default noteRoute

