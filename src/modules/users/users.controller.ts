import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user-dto';
import { ParseDatePipe } from './pipes/parse-date/parse-date.pipe';

@Controller('api/V1/users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  getUsers(
    @Query('start', ParseDatePipe) start: Date,
    @Query('end', ParseDatePipe) end: Date,
  ) {
    return this.userService.getUsers(start, end);
  }

  @Put()
  updateUser(@Body() user: UserDto) {
    return this.userService.updateUser(user);
  }
  @Delete('/:idUser')
  deleteUser(@Param('idUser') idUser: number) {
    return this.userService.deleteUser(idUser);
  }
}
