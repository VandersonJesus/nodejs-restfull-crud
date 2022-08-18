import { User } from "../../../entities/User";

export class UserRequestDTO {
    id: number;
    firstName: string;
    lastName: string;
    age: number;

    public static ofEntity(user: User): UserRequestDTO {
        const userDTO: UserRequestDTO = new UserRequestDTO();
        userDTO.firstName = user.firstName;
        userDTO.lastName = user.lastName;
        userDTO.age = user.age;
        return userDTO;
    }
}