import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ActivationResponse, LoginResponse, RegisterResponse } from "./types/user.types";
import { ActivationDto, RegisterDto } from "./dtos/user.dto";
import { BadRequestException, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from "express";
import { AuthGuard } from "./guards/auth.gaurd";

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

    @Mutation(() => LoginResponse)
    async Login(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<LoginResponse>
    {
        return await this.userService.Login({ email, password });
    }

    @Query(() => LoginResponse)
    @UseGuards(AuthGuard)
    async getLoggedInUser(@Context() context: { req: Request })
    {
        return await this.userService.getLoggedInUser(context.req);
    }

}