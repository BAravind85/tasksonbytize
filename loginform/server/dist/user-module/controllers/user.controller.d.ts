import { UserService } from '../services/user.service';
import { Response } from 'express';
import { CreateUserDTO } from '../dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(res: Response, userParam: CreateUserDTO): Promise<void>;
    listUser(res: Response): Promise<void>;
}
