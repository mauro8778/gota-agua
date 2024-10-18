import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class WaterJugDto {
  @ApiProperty({
    description: 'Capacidad del primer jarrón (X) en litros, debe ser un número entero mayor a 0',
    example: 3,
    minimum: 1,
  })
  @IsInt({ message: 'La capacidad de X debe ser un número entero' })
  @Min(1, { message: 'La capacidad de X debe ser mayor que 0' })
  x_capacity: number;

  @ApiProperty({
    description: 'Capacidad del segundo jarrón (Y) en litros, debe ser un número entero mayor a 0',
    example: 5,
    minimum: 1,
  })
  @IsInt({ message: 'La capacidad de Y debe ser un número entero' })
  @Min(1, { message: 'La capacidad de Y debe ser mayor que 0' })
  y_capacity: number;

  @ApiProperty({
    description: 'Cantidad de agua deseada (Z) en litros, debe ser un número entero mayor a 0',
    example: 4,
    minimum: 1,
  })
  @IsInt({ message: 'La cantidad deseada Z debe ser un número entero' })
  @Min(1, { message: 'La cantidad deseada Z debe ser mayor que 0' })
  z_amount_wanted: number;
}
