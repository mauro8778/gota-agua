import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {  WaterJugModule } from './ejecutar/ejecutar.module';

@Module({
  imports: [WaterJugModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
