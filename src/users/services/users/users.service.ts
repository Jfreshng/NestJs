import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { users } from 'src/static/users';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { SerializedUser } from 'src/users/types';
import { User } from 'src/typeorm'
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {

    constructor (@InjectRepository(User) private readonly userRepository: Repository<User>){

    }

    getUsers() {
        // return users;
        return users.map(user => new SerializedUser(user)); 
        // plainToClass(SerializedUser, users)
    }

    getUserByUserName(username: string) {
        return users.find(user => user.username === username);
    }

    getUserById(userId: string){
        return users.find(user =>  user.userId === userId);
    }

    createUser(createUserDto: CreateUserDto) {
        const user = {
            ...createUserDto,
            password: encodePassword(createUserDto.password)
        }
        const newUser = this.userRepository.create(createUserDto);
        console.log("about to save ", newUser);
        return this.userRepository.save(newUser);
    }

    findUserByUsername(username: string) {
        return this.userRepository.findOne({ 
            where: {
                // username: username
                username
            }
         })
    }

}