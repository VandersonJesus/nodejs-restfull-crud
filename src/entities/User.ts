import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { UserRequestDTO } from "../dtos/request/User/UserRequestDTO"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    public static toUpdate(entity: User, dto: UserRequestDTO): User {
        entity.firstName = dto.firstName;
        entity.lastName = dto.lastName;
        entity.age = dto.age;
        return entity;
    }

}