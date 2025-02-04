import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

async function server() {

  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT || 5000

  app.enableCors({ origin: process.env.CORS || '*' })

  await app.listen(port, () => console.log(`Server has been started in PORT = ${port}`))
}
server()
