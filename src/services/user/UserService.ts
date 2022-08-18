import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { UserRequestDTO } from "../../dtos/request/User/UserRequestDTO";
import { DeleteUserResponseDTO } from "../../dtos/response/User/DeleteUserResponseDTO";
import { UserResponseDTO } from "../../dtos/response/User/UserResponseDTO";
import { User } from "../../entities/User";

export class UserService {

    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    public async create(request: Request, response: Response): Promise<UserResponseDTO> {
        try {
            const body: UserRequestDTO = request.body;
            const result = await this.userRepository.save(body);
            return UserResponseDTO.ofEntity(result);
        } catch (error) {
            response.status(500).json({
                message: error.message,
            });
        }
    }

    public async update(request: Request, response: Response): Promise<UserResponseDTO | Error> {
        try {
            const body: UserRequestDTO = request.body;

            if (!body.id)
                return new Error('The id is mandatory!');
            const userToUpdate = await this.userRepository.findOneBy({ id: body.id });
            if (!userToUpdate)
                return new Error(`User with id: ${body.id} don't exist!`);

            const result = await this.userRepository.save(User.toUpdate(userToUpdate, body));
            return UserResponseDTO.ofEntity(result);
        } catch (error) {
            response.status(500).json({
                message: error.message,
            });
        }
    }

    public async getAllUsers(request: Request, response: Response): Promise<UserResponseDTO[] | Error> {
        try {
            const result: User[] = await this.userRepository.find();

            if (result instanceof Error)
                return new Error('Error in getAllUsers method');

            return result.map(entity => UserResponseDTO.ofEntity(entity));
        } catch (error) {
            response.status(500).json({
                message: error.message,
            });
        }
    }

    public async getUserById(request: Request, response: Response): Promise<UserResponseDTO | Error> {
        try {

            const id = request.params.id;

            const result: User = await this.userRepository.findOneBy({ id: Number(id) });

            if (result instanceof Error)
                return new Error(`User with id: ${id} not found!`);

            return UserResponseDTO.ofEntity(result);
        } catch (error) {
            response.status(500).json({
                message: error.message,
            });
        }
    }

    public async delete(request: Request, response: Response): Promise<DeleteUserResponseDTO | Error> {
        try {

            const id = request.params.id;

            const user: User = await this.userRepository.findOneBy({ id: Number(id) });

            if (user instanceof Error)
                return new Error(`User with id: ${id} not found!`);

            const result = await this.userRepository.delete(user);

            if (result.affected)
                return { message: 'The user has bien deleted!' };
            else
                return new Error('Error try delete user!');

        } catch (error) {
            response.status(500).json({
                message: error.message,
            });
        }
    }

}