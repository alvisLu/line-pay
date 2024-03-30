import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  Min,
  Max,
  IsString,
} from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    type: 'number',
    example: 1,
    minimum: 1,
    title: 'Page',
    exclusiveMinimum: true,
  })
  @Min(1)
  page = 1;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    type: 'number',
    example: 10,
    minimum: 1,
    maximum: 1000,
    title: 'Limit',
    exclusiveMinimum: true,
    exclusiveMaximum: true,
  })
  @Min(1)
  @Max(1000)
  limit = 10;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ description: '開始時間' })
  readonly startDate?: Date;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ description: '結束時間' })
  readonly endDate?: Date;

  @ApiPropertyOptional({ description: '排序' })
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  sort?: any;
}
