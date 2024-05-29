import express, { Request, Response } from "express";
import users from "./userRoutes";
import todo from "./todoRoutes";

const routes = (app: any) => {
    app.route("/").get((req: Request, res: Response) => {
        res.status(200).send("API To-Do");
    });

    app.use(express.json(), users, todo);

}

export default routes;