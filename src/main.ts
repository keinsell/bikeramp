import { NestFactory } from '@nestjs/core'
import { AppModule } from './application/app.module'
import { PrismaService } from './infrastructure/prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(3000)
}

bootstrap()
