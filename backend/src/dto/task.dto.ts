import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
  IsNumberString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;
}

export class UpdateTaskDto {
  @IsNumber()
  id!: number;

  @IsString()
  @IsNotEmpty()
  title!: string;
}

export class QueryTaskDto {
  @IsOptional()
  @IsIn(['all', 'completed', 'pending'])
  status?: string = 'all';

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}