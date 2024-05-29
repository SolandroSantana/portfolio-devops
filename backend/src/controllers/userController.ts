import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

class UserController {

  static async authenticateUser(req: Request, res: Response) {

    try {
      // ** Get The User Data From Body ;
      const user = req.body;
      
      // ** destructure the information from user;
      const { email, password } = user;

      // ** Check the (email/user) exist  in database or not ;
      const isUserExist = await prisma.user.findFirst({
        where: {
          email: email,
        }
      });
      
      // ** if there is not any user we will send user not found;
      if (!isUserExist) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "User not found",
        });
        return;
      }

      // ** if the (user) exist  in database we will check the password is valid or not ;
      // **  compare the password in db and the password sended in the request body

      const isPasswordMatched =
        isUserExist.password == password;

      // ** if not matched send response that wrong password;

      if (!isPasswordMatched) {
        res.status(400).json({
          status: 400,
          success: false,
          message: "wrong password",
        });
        return;
      }

      // ** if the email and password is valid create a token

      /*
      To create a token JsonWebToken (JWT) receive's 3 parameter
      1. Payload -  This contains the claims or data you want to include in the token.
      2. Secret Key - A secure key known only to the server used for signing the token.
      3. expiration -  Additional settings like token expiration or algorithm selection.
      */

      // !! Don't Provide the secret openly, keep it in the .env file. I am Keeping Open just for demonstration

      // ** This is our JWT Token
      const token = jwt.sign(
        { _id: isUserExist?.id, email: isUserExist?.email },
        `${process.env.JWT_SECRET_KEY}`,
        {
          expiresIn: "15s",
        }
      );

      // send the response
      res.status(200).json({
        status: 200,
        success: true,
        message: "login success",
        user: isUserExist.name,
        token: token,
      });
    } catch (error: any) {
      // Send the error message to the client
      res.status(400).json({
        status: 400,
        message: error.message.toString(),
      });
    }

  }

  static async createUser(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;
      const verifyEmail = await prisma.user.findUnique({ where: { email: email } })
      if (verifyEmail) {
        return res.status(400).json({ message: "Email já cadastrado!" })
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({ data: {
        email: email,
        name: name,
        password: hashPassword
      } })
      res.status(201).json({ message: "Usuário cadastrado com sucesso! ", user: newUser });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar o usuário!` });
    }

  }

  static async listUsers(req: Request, res: Response) {
    try {
      const getUsers = await prisma.user.findMany()
      res.status(200).json(getUsers);

    } catch (error: any) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição!` });
    }

  }

};


export default UserController