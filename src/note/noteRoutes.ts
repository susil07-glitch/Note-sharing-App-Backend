
import express from "express"
import createNote from "./noteController"

const noteRoute= express.Router()

import {multer,storage} from "./../MiddleWares/multerMiddleWare"

const upload =multer({storage:storage})

noteRoute.route("/create").post( upload.single("file"),createNote)

export default noteRoute

