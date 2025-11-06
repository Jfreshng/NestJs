import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';
import { UserNotFoundException } from '../../exceptions/UserNotFoundException';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';

@Controller('users')
export class UsersController {

    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService,
    ){

    }

    @UseInterceptors(ClassSerializerInterceptor )
    @Get('')
    getUsers() {
        const user = this.userService.getUsers();
        return user;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('username/:username')
    getUserByUsername(@Param('username') username: string) {
        const user = this.userService.getUserByUserName(username);
        // if(user) return user;
        if (user) return new SerializedUser(user);
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    @Get('/id/:id')
    @UseFilters(HttpExceptionFilter)
    getUserById(@Param('id') id: string){
        const foundUser = this.userService.getUserById(id);
        if (foundUser) return foundUser;
        // else throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
        else throw new UserNotFoundException();
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto){
        console.log("body ", createUserDto);
        return this.userService.createUser(createUserDto);
    }
    
}
