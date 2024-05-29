import express from "express";
import UserController from "../controllers/userController";
import verifyToken from "../auth/authToken";

const routes = express.Router();

routes.get('/auth/users', verifyToken, UserController.listUsers);
routes.post('/auth/users', UserController.createUser);
routes.post('/auth/login', UserController.authenticateUser);


export default routes;