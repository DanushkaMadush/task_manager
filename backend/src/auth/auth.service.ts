import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { generateToken } from './jwt';

@Injectable()
export class AuthService {
    
    login(dto: LoginDto) {
        const { username, password } = dto;

        if (username !== 'admin' || password!== 'admin') {
            throw new UnauthorizedException('Invalid readentials');
        }

        const payload = { username };

        return {
            accessToken: generateToken(payload)
        };
    }
}