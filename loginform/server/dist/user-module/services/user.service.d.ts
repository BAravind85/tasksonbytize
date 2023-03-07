import { Model } from 'mongoose';
import { CreateUserDTO } from '../dto/user.dto';
import { User } from '../interface/user.interface';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    listUser(): Promise<User[]>;
    createUser(user: CreateUserDTO): Promise<User>;
}
