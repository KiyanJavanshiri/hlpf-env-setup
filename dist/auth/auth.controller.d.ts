import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
