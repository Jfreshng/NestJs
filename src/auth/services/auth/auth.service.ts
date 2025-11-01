import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
    constructor(@Inject('USER_SERVICE') private readonly userService: UsersService){}

    async validateUser (username: string, password: string) {
        const userDb = await this.userService.findUserByUsername(username);
        if (userDb && userDb.password === password) {
            console.log("user validation success");
            return userDb;
        }
        return null;
    }
}
