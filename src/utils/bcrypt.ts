import * as bcrypt from 'bcrypt';

const SALT = 10;

export function hashPassword(rawPassword: string){
    const SALT = bcrypt.genSaltSync()
    return bcrypt.hashSync(rawPassword, SALT)
}

export function comparePassword(rawPassword: string, hash: string){
    return bcrypt.compareSync(rawPassword, hash);
}