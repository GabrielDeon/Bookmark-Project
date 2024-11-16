import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT') || 5000;

  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET, PUT, PATCH, POST, DELETE, HEAD', 
    credentials: true, // Allows sending credentials such as cookies or HTTP authentication
  });
  
  await app.listen(port);
  console.log(`Server running on Port: ${port}`);
  
}
bootstrap();
