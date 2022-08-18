import { User } from "../../../entities/User"

export class UserResponseDTO {
    id: number
    firstName: string
    lastName: string
    age: number

    public static ofEntity(user: User): UserResponseDTO {
        const userDTO: UserResponseDTO = new UserResponseDTO();
        userDTO.id = user.id;
        userDTO.firstName = user.firstName;
        userDTO.lastName = user.lastName;
        userDTO.age = user.age;
        return userDTO;
    }
}