import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user-dto';

@Injectable()
export class UsersService {
  private _users: UserDto[];

  constructor() {
    this._users = [];
  }

  createUser(user: UserDto) {
    const userFound = this._users.find((u) => u.id == user.id);
    if (!userFound) {
      this._users.push(user);
      console.log(this._users);
      return true;
    }
    return false;
  }

  getUsers(start: Date, end: Date) {
    if (start && end) {
      return this._users.filter(
        (u) =>
          u.birthDate.getTime() >= start.getTime() &&
          u.birthDate.getTime() <= end.getTime(),
      );
    } else if (start && !end) {
      return this._users.filter(
        (u) => u.birthDate.getTime() >= start.getTime(),
      );
    } else if (!start && end) {
      return this._users.filter((u) => u.birthDate.getTime() <= end.getTime());
    }
  }

  updateUser(user: UserDto) {
    const userAdder = this.createUser(user);

    if (!userAdder) {
      const index = this._users.findIndex((u) => u.id === user.id);
      this._users[index] = user;
    }
    return true;
  }

  deleteUser(idUser: number) {
    const index = this._users.findIndex((u) => u.id === idUser);

    if (index != -1) {
      this._users.splice(index, 1);
      return true;
    }
    return false;
  }
}
