import { Request, Response } from "express";
import { UserService } from "../services/user/UserService";

export class UserController {

    public async findAllUsers(request: Request, response: Response) {
        const userService: UserService = new UserService();
        const result = await userService.getAllUsers(request, response);
        return response.status(200).json(result);
    }

    public async findUserById(request: Request, response: Response) {
        const userService: UserService = new UserService();
        const result = await userService.getUserById(request, response);
        return response.status(200).json(result);
    }

    public async create(request: Request, response: Response) {
        const userService: UserService = new UserService();
        const result = await userService.create(request, response);
        return response.status(200).json(result);
    }

    public async update(request: Request, response: Response) {
        const userService: UserService = new UserService();
        const result = await userService.update(request, response);
        return response.status(200).json(result);
    }

    public async delete(request: Request, response: Response) {
        const userService: UserService = new UserService();
        const result = await userService.delete(request, response);
        return response.status(200).json(result);
    }
}