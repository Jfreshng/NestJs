import * as bcrypt from 'bcrypt';

// const SALT = 10;
export const encodePassword = (rawPassword: string) => {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hash(rawPassword, SALT);
}