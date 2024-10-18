import { Module } from '@nestjs/common';
import { WaterJugController } from './ejecutar.controller';
import { WaterJugService } from './ejecutar.service';


@Module({
    controllers: [WaterJugController],
    providers: [WaterJugService],
})
export class WaterJugModule {}
