import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { WaterJugService } from './ejecutar.service';
import { WaterJugDto } from 'src/dtos/WaterJugoDto';



@ApiTags('Problema de los jarrones de agua')
@Controller('water-jug')
export class WaterJugController {
    constructor(private readonly waterJugService: WaterJugService) { }

    @Post()
    @ApiOperation({ summary: 'Resuelve el problema de los jarrones de agua' })
    @ApiResponse({ status: 200, description: 'Solución calculada correctamente', type: Object })
    @ApiResponse({ status: 400, description: 'Datos de entrada no válidos' })
    @ApiBody({
        type: WaterJugDto,
        description: 'Capacidades de los jarrones X e Y, y la cantidad objetivo Z',
        examples: {
            ejemplo1: {
                summary: 'Ejemplo con capacidades de 3 y 5 litros, buscando 4 litros(tiene solucion)',
                value: {
                    x_capacity: 3,
                    y_capacity: 5,
                    z_amount_wanted: 4
                }
            },
            ejemplo2: {
                summary: 'Ejemplo con capacidades de 2 y 6 litros, buscando 5 litros (no tiene solucion)',
                value: {
                    x_capacity: 2,
                    y_capacity: 6,
                    z_amount_wanted: 5
                }
            }
        }
    })
    computeWaterJug(@Body() body: WaterJugDto): { solution: any[] } {
        const { x_capacity, y_capacity, z_amount_wanted } = body;
        return this.waterJugService.waterJugSolver(x_capacity, y_capacity, z_amount_wanted);
    }
}
