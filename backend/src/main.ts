import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';

async function server() {

  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT || 5000

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({ origin: process.env.CORS || '*' })

  await app.listen(port, () => console.log(`Server has been started in PORT = ${port}`))
}
server()
