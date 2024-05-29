import { Request, Response } from "express";
import { prisma } from "../db/db";

class TodoController {

    static async listTodos(req: Request, res: Response) {
        try {
            const getTodos = await prisma.todo.findMany()
            res.status(200).json(getTodos);

        } catch (error: any) {
            res
            .status(500)
            .json({ message: `${error.message} - falha na requisição!` });
        }
        
    }

    static async createTodo(req: Request, res: Response) {
        try {
            const newTodo = await prisma.todo.create({
                data: req.body
            })
            res.status(201).json({message: "Tarefa criada com sucesso! ", todo: newTodo});
        } catch (error: any) {
            res
            .status(500)
            .json({ message: `${error.message} - Falha ao criar tarefa!` });
        }
        
    }

    static async updateTodo(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updateTodo = await prisma.todo.update({
                where: {
                    id: id
                },
                data: req.body     
            })
            res.status(200).json({message: "Tarefa alterada com sucesso!", todo: updateTodo});
        } catch (error: any) {
            res
            .status(500)
            .json({ message: `${error.message} - Falha ao cadastrar a tarefa!` });
        }
        
    }

    static async deleteTodo(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await prisma.todo.delete({
                where: {
                    id: id
                }
            })
            res.status(200).json({message: "Tarefa deletada com sucesso!"});
        } catch (error: any) {
            res
            .status(500)
            .json({ message: `${error.message} - Falha ao deletar a tarefa!` });
        }
        
    }
};


export default TodoController