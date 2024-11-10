import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Didi-Changes Challenge API')
    .setDescription(
      'Esta API  que integra la API de Star Wars usando NestJS. El proyecto incluye cron jobs para ejecutar tareas programadas automáticamente, demostrando cómo estructurar y gestionar servicios en NestJS para consumir APIs externas de manera eficiente.',
    )
    .addTag('People')
    .addTag('Films')
    .addTag('Planets')
    .addTag('Starships')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
