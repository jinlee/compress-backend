import { applyDecorators } from '@nestjs/common';
import { IsOptional, IsInt, Min, Max, IsNumber } from 'class-validator';

export function QualityValidators() {
  return applyDecorators(
    IsOptional(),
    IsInt(),
    Min(1),
    Max(100),
    IsNumber({
      allowNaN: false,
      allowInfinity: false,
    }),
  );
}
