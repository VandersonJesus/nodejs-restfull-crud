import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { User } from "./entities/User";

const routes = Router();

// User routes
routes.get('/users', new UserController().findAllUsers);
routes.post('/users/create', new UserController().create);
routes.get('/users/:id', new UserController().findUserById);
routes.put('/users', new UserController().update);
routes.delete('/users/:id', new UserController().delete)

export { routes };

