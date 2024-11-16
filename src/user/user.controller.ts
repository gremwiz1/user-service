import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('reset-issues')
  async resetIssuesAndCount() {
    const count = await this.userService.resetIssuesAndCount();
    return { usersWithIssues: count };
  }
}
