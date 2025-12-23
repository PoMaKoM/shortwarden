import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { Role, User } from '@shortwarden/prisma';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles, UserCtx } from '../../shared/decorators';
import { IPaginationResult, calculateSkip } from '../../shared/utils';
import { UpdateDto } from './dto/update.dto';
import { UserContext } from '../../auth/types/user-context';
import { AuthService } from '../../auth/auth.service';
import { AppConfigService } from '../config/config.service';
import { AppLoggerService } from '../logger/logger.service';
import { CountQueryDto } from './dto/count-query.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: AppConfigService,
    private readonly logger: AppLoggerService,
    private readonly authService: AuthService
  ) {}

  @Get()
  @Roles(Role.ADMIN)
  async findAll(@Query() query: FindAllUsersDto): Promise<IPaginationResult<User>> {
    const { page, limit, filter, sort } = query;

    return this.usersService.findAll({
      ...(page && { skip: calculateSkip(page, limit) }), // if page is defined, then calculate skip
      limit,
      filter,
      sort,
    });
  }

  @Get('count')
  @Roles(Role.ADMIN)
  async count(@Query() { startDate, endDate, verified }: CountQueryDto) {
    const filter: Record<string, any> = {};

    if (startDate && endDate) {
      filter.createdAt = { gte: startDate, lte: endDate };
    }

    if (typeof verified === 'boolean') {
      filter.verified = verified;
    }

    // Perform the count operation with the dynamic filter
    const count = await this.usersService.count(filter);

    return { count };
  }

  @Patch('update')
  @Roles(Role.ADMIN, Role.USER)
  async update(@UserCtx() user: UserContext, @Body() { displayName }: UpdateDto) {
    // Update the user's name if 'displayName' is provided
    if (displayName) {
      const updatedUser = await this.usersService.updateById(user.id, {
        name: displayName,
      });
      user = { ...user, ...updatedUser };
    }

    const tokens = await this.authService.generateTokens(user);
    return tokens;
  }
}
