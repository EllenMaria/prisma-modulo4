import { Router } from "express";

import UserController from "../controllers/UserController";

const usersRouters = Router();

usersRouters.post("/user", UserController.createUser);
usersRouters.get("/users", UserController.findAllUsers);
usersRouters.get("/user/:id", UserController.findUser);
usersRouters.put("/user/:id", UserController.updateUser);
usersRouters.delete("/user/:id", UserController.deleteUser);

export { usersRouters };
