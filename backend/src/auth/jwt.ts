import { JwtService } from '@nestjs/jwt';

export const jwtService = new JwtService({
  secret: 'danushka_madushan',
  signOptions: { expiresIn: '1h' },
});

export function generateToken(payload: any) {
  return jwtService.sign(payload);
}