import { Body, Controller, Post, Get, Delete, Patch, Param, Query, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user-dto";
import { UsersService } from "./users.service";
import { Serialize } from "../interceptors/serialize.interceptior";
import { UserDto } from "../users/dtos/user.dto";

@Controller("auth")
// this Serialize decorator can be placed in each individual routes below if needed, but
// in this case we are making use of the same rules for each routes and we have the same dto
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService){}
  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password)
  }


  @Get("/:id")
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id))
    if (!user) {
      throw new NotFoundException('user not found')
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.findAll(email)
  }

  @Delete("/:id")
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id))
  }

  @Patch("/:id")
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body)
  }
}
