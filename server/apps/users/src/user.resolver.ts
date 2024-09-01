import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { RegisterResponse } from "./types/user.types";
import { RegisterDto } from "./dtos/user.dto";
import { BadRequestException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from "express";

@Resolver('User')
// @UseFilters
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerDto') registerDto: RegisterDto, response:Response

    // @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill the all fields');
    }

    const user = await this.userService.register(
      registerDto,
      response
    //   context.res,
    );

    return { user };
  }
}