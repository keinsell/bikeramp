import { NestFactory } from '@nestjs/core'
import { AppModule } from './application/app.module'
import { PrismaService } from './infrastructure/prisma/prisma.service'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Validation
  app.useGlobalPipes(new ValidationPipe())

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Bikeramp')
    .setDescription(
      '🚲 Imagine you are a bike courier and you want to build a system that will help you track your rides during delivery of packages: how many kilometers did you ride on each day and how much did customer pay for delivery. The app will help you to control your work.',
    )
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('', app, document)

  // Prisma
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(3000)
}

bootstrap()
