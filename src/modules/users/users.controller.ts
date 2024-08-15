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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user-dto';
import { ParseDatePipe } from './pipes/parse-date/parse-date.pipe';

@Controller('api/V1/users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @ApiOperation({
    description: 'Crear un usuario.',
  })
  @ApiBody({
    description:
      'Crea un Usuario, mediante UserDto. Devuelve true si el usuario se creo exitosamente',
    type: UserDto,
    examples: {
      ejemplo1: {
        value: {
          id: 1,
          name: 'fernando',
          email: 'fernando01@gmail.com',
          birthDate: '2025-02-01',
        },
      },
    },
  })
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  @ApiQuery({
    name: 'start',
    required: false,
    type: Date,
    description:
      'Si se proporciona, devolvera todos los usuarios mayores o iguales a la fecha ',
  })
  @ApiQuery({
    name: 'end',
    required: false,
    type: Date,
    description:
      'Si se proporciona, se devolvera todos los usuarios menores o iguales a la fecha ',
  })
  @ApiOperation({
    description:
      'devuelve los valores filtrados las fechas de cumpleaños entre start y end, y si no se ingresa un filtrado se devuelven todos los datos en existencia',
  })
  getUsers(
    @Query('start', ParseDatePipe) start: Date,
    @Query('end', ParseDatePipe) end: Date,
  ) {
    return this.userService.getUsers(start, end);
  }

  @Put()
  @ApiOperation({
    description:
      'Atualiza un usuario en el caso que exista un id,  en el caso contrario, nos crearia un nuevo usuario. devuelve un True si se realiza con exito',
  })
  @ApiBody({
    description: 'Editamos un usuario usando UsersDto',
    examples: {
      ejemplo1: {
        value: {
          id: 2,
          name: '1213123131',
          email: 'fernando01@gmail.com',
          birthDate: '2025-02-01',
        },
      },
    },
  })
  updateUser(@Body() user: UserDto) {
    return this.userService.updateUser(user);
  }
  @Delete('/:idUser')
  @ApiParam({
    name: 'idUser',
    type: Number,
    description: 'Id del usuario que desea borrar',
  })
  @ApiOperation({
    description:
      'elimina un usuario en caso que se encuentre el identificador en la base de datos y devuelve un true si se realiza con exito',
  })
  deleteUser(@Param('idUser') idUser: number) {
    return this.userService.deleteUser(idUser);
  }
}
