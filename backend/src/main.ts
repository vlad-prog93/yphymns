import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import dotenv from 'dotenv'

async function server() {
  dotenv.config()
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)

  app.enableCors({ origin: process.env.CORS || 'localhost' })
  // app.enableCors({
  //   origin: true, // Allowed origins
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  //   credentials: true, // Allow credentials (e.g., cookies)
  //   allowedHeaders: 'Content-Type, Accept', // Allowed headers
  // });

  await app.listen(PORT, () => console.log(`Server has been started in PORT = ${PORT}`))
}
server()
