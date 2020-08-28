import { Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiResponse } from '@blitz-basic-script/api-interfaces';

import { User } from '@blitz-basic-script/authentication';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('auth/username-exists')
  checkIfUsernameExists(): ApiResponse<{ exists: boolean }> {
    return null;
  }

  @Get('auth/email-exists')
  checkIfEmailExists(): ApiResponse<{ exists: boolean }> {
    return null;
  }

  @Post('auth/register')
  register(): ApiResponse<void> {
    return null;
  }

  @Post('auth/login')
  login(): ApiResponse<User> {
    return null;
  }
}
