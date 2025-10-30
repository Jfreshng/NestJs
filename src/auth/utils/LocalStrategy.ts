import { PassportSerializer } from "@nestjs/passport";

export class LocalStrategy extends PassportSerializer {
    serializeUser(user: any, done: Function) {
        throw new Error("Method not implemented.");
    }
    deserializeUser(payload: any, done: Function) {
        throw new Error("Method not implemented.");
    }

}