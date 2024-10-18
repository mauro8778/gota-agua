import { MiddlewareConsumer, Module } from '@nestjs/common';
import { WaterJugController } from './ejecutar.controller';
import { WaterJugService } from './ejecutar.service';
import { EmptyBodyMiddleware } from 'src/middlewares/empty-body/empty-body.middleware';


@Module({
    controllers: [WaterJugController],
    providers: [WaterJugService],
})
export class WaterJugModule {}