import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findUserByEmail(signInDto.email);

    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        signInDto.password,
        user.password,
      );

      if (!isPasswordMatch) {
        throw new UnauthorizedException('Incorrect password');
      }

      const expiresIn = signInDto.rememberme ? '30d' : '1h';

      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload, { expiresIn }),
      };      
    }

    throw new NotFoundException('No user was found!');
  }
}
