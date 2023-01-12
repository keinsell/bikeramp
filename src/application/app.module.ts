import { Module } from '@nestjs/common';
import { AppController } from '../modules/trips/app.controller';
import { AppService } from '../modules/trips/app.service';
import { PrismaService } from '../infrastructure/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
