import { NextFunction, Request, Response } from "express";
import user from "./AuthModel";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "./AuthTypes";

// register user router //

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { UserName, Password, Email } = req.body;
    if (!UserName || !Password || !Email) {
      res.status(400).json({
        message: "Please provide UserName ,Password and Email !!!",
      });
    }

    const existingUser = await user.findOne({ Email: Email });

    if (existingUser) {
      res.status(400).json({
        message: "User Already Exists !!!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const newUser = await user.create({
      UserName: UserName,
      Password: hashedPassword,
      Email: Email,
    });

    res.status(201).json({
      message: "User Registered Successfully !!!",
      data: newUser,
    });
  } catch (error) {
    console.log(error);

    return next(createHttpError(500, "Error while registering user !!!"));
  }
};

// user login router //

 export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      res.status(400).json({
        message: "Please provide Email and Password !!!",
      });
    }
    const existUser :IUser | null = await user.findOne({ Email:Email });
    

    if (!existUser) {
      res.status(400).json({
        message: "User Not Found. , Please Register First !!!",
      });
    }

    const isPasswordMatch = await bcrypt.compare(Password, existUser.Password);
    if (!isPasswordMatch) {
      res.status(400).json({
        message: "Invalid Password !!!",
      });
    }

    const token = jwt.sign(
      {
        id: existUser._id,
      },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login Successfull !!!",
      token: token,
      data: existUser,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while login user !!!"));
  }
};
