import { NextFunction, Request, Response } from "express";
import envConfig from "../Config/config";

import createHttpError from "http-errors";
import note from "./noteModel";
import fs from "fs";

// createNote Controller //
export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const file = req.file
      ? `${envConfig.backendurl}/${req.file.filename}`
      : "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D";
    const { title, subtitle, description } = req.body;
    if (!file || !title || !description) {
      res.status(400).json({
        message: "Please provide title,subtitle,description and file",
      });
      return;
    }
    await note.create({
      title: title,
      subtitle: subtitle,
      description: description,
      file: file,
    });

    return res.status(201).json({
      message: "Note created successfully",
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error While creating note "));
  }
};

// note featching controller //
export const fetchNotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const notes = await note.find();

    return res.status(200).json({
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error While fetching notes "));
  }
};

// single note featching controller //
export const featchingSingleNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const noteToFetch = await note.findById(id);
    if(!noteToFetch){
      return next(createHttpError(404,"Note note Found !!!"))
    }
    res.status(201).json({
      message: "Note Fetched successfully",
      data: noteToFetch,
    });
  } catch (error) {
    return next(
      createHttpError(505, "something went wrong while fetching note"),
    );
  }
};

// deleteNote controller //

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const noteToDelete = await note.findById(id);
    if (!noteToDelete) {
      return next(createHttpError(404, "Note not found "));
    }

    fs.unlink(`uploads/${noteToDelete.file}`, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Note deleted Successfully !!!");
      }
    });

    await note.findByIdAndDelete(id);

    res.status(201).json({
      message: "Note deleted successfully ",
    });
  } catch (error) {
    console.log(error);
  }
};

// noteUpdate controller //

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const file = req.file
      ? `${envConfig.backendurl}/${req.file.filename}`
      : "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D";
    const { title, subtitle, description } = req.body;
    const noteToUpdate = await note.findById(id);
    if (!noteToUpdate) {
      return next(createHttpError(404, "Note not found "));
    }

    fs.unlink(`uploads/${noteToUpdate.file}`, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Note update Successfully !!!");
      }
    });

    await note.findByIdAndUpdate(id, {
      title: title,
      subtitle: subtitle,
      description: description,
      file: file,
    });

    res.status(201).json({
      message: "Note updated successfully ",
    });
  } catch (error) {
    console.log(error);
  }
};
