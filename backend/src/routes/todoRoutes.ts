import express from "express";
import TodoController from "../controllers/todoController";
import verifyToken from "../auth/authToken";

const routes = express.Router();

routes.get('/todos/', verifyToken, TodoController.listTodos);
routes.post('/todos/', TodoController.createTodo);
routes.put('/todo/:id', TodoController.updateTodo);
routes.delete('/todo/:id', TodoController.deleteTodo);



export default routes;