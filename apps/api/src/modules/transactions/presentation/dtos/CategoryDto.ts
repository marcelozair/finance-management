import { IsString, IsNumber } from 'class-validator';

export class CategoryDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  color: string;

  @IsString()
  iconName: string;
}
