import { IsString, IsNumber } from 'class-validator';

export class SubCategoryDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  iconName: string;
}
