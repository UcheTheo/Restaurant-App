import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { ActivationResponse, RegisterResponse } from "./types/user.types";
import { ActivationDto, RegisterDto } from "./dtos/user.dto";
import { BadRequestException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from "express";

@Resolver('User')
// @UseFilters
export class UsersResolver
{
    constructor(private readonly userService: UsersService) { }

    @Mutation(() => RegisterResponse)
    async register(
        @Args('registerDto') registerDto: RegisterDto,
        @Context() context: { res: Response },
    ): Promise<RegisterResponse>
    {
        if (!registerDto.name || !registerDto.email || !registerDto.password)
        {
            throw new BadRequestException('Please fill the all fields');
        }

        const { activation_token, activationCode } = await this.userService.register(
            registerDto,
            context.res,
        );

        return { activation_token, activationCode };
    }

    @Mutation(() => ActivationResponse)
    async activateUser(
        @Args('activationDto') activationDto: ActivationDto,
        @Context() context: { res: Response },
    ): Promise<ActivationResponse>
    {
        return await this.userService.activateUser(activationDto, context.res);
    }
}