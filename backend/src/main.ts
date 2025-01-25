import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

async function server() {

  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT || 5001

  app.enableCors({ origin: process.env.CORS || 'localhost' })

  await app.listen(port, () => console.log(`Server has been started in PORT = ${port}`))
}
server()
