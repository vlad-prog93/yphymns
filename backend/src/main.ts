import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from 'src/app.module';

async function server() {

  const app = await NestFactory.create(AppModule, { bodyParser: false })
  const port = process.env.PORT || 5000

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({ origin: process.env.CORS || '*' })
  app.use(bodyParser.json({ limit: '20mb' }))
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // убирает лишние поля
      forbidNonWhitelisted: true, // ошибка если лишние поля
      transform: true,
    }),
  );

  await app.listen(port, () => console.log(`Server has been started in PORT = ${port}`))
}
server()
