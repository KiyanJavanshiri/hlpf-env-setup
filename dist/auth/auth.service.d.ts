import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        id: number;
        email: string;
        name: string;
        role: import("../common/enums/role.enum").Role;
        createdAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
    }>;
}
