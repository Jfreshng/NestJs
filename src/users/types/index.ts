import { Exclude } from "class-transformer";

export interface User {
    userId: string,
    username: string,
    userFirstName: string,
    userLastName: string,
    email: string,
    password: string,
}

export class SerializedUser {
    userId: string;
    username: string;
    userFirstName: string;
    userLastName: string;
    email: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<SerializedUser>) {
        Object.assign(this, partial);
    }

}