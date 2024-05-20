import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(' From Ubantu 4')
  await app.listen(3000);
}
bootstrap();
