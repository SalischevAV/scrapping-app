import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalCustomStrategy } from '../strategies/local-custom.strategy';

@Injectable()
export class LocalCustomAuthGuard extends AuthGuard(LocalCustomStrategy.key) {}
