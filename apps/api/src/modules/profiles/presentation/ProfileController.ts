import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { ResHandler } from 'src/core/utils/response-handler';
import { UserId } from 'src/core/decorators/UserDecorator';
import { AuthGuard } from 'src/shared/infrastructure/security/AuthGuard';
import { GetAllProfilesUseCase } from '../application/useCases/GetAllProfilesUseCase';
import { UpdateProfileUseCase } from '../application/useCases/UpdateProfileUseCase';
import { UpdateProfileDTO } from './dto/updateProfile.dto';

@Controller('profiles')
@UseGuards(AuthGuard)
export class ProfileController {
  @Inject(GetAllProfilesUseCase)
  private readonly getAllProfilesUseCase: GetAllProfilesUseCase;

  @Inject(UpdateProfileUseCase)
  private readonly updateProfileUseCase: UpdateProfileUseCase;

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProfiles(@UserId() userId: number) {
    const response = await this.getAllProfilesUseCase.execute(userId);
    return ResHandler(response);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @UserId() userId: number,
    @Param('id') profileId: string,
    @Body() body: UpdateProfileDTO,
  ) {
    const response = await this.updateProfileUseCase.execute(
      userId,
      Number(profileId),
      body,
    );
    return ResHandler(response);
  }
}
