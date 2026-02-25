
import express from "express"
import {createNote ,deleteNote, updateNote} from "./noteController"


const noteRoute= express.Router()

import {multer,storage} from "./../MiddleWares/multerMiddleWare"

const upload =multer({storage:storage})

noteRoute.route("/create").post( upload.single("file"),createNote)
noteRoute.route("/delete/:id").delete(deleteNote)
noteRoute.route("/update/:id").patch(upload.single("file"),updateNote)


export default noteRoute

