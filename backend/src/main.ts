import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/allExceptionsFilter';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  
  app.useGlobalFilters(app.get(AllExceptionsFilter));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
