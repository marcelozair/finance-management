import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/infrastructure/security/AuthGuard';
import { GetCategoriesUseCase } from '../application/useCases/GetCategoriesUseCase';
import { ResHandler } from 'src/shared/utils/response-handler';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {
  @Inject()
  private readonly getCategoriesUseCase: GetCategoriesUseCase;

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const response = await this.getCategoriesUseCase.execute();
    return ResHandler(response, 'Categories obtained successfully');
  }
}
