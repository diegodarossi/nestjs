import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiModule } from './ApiModule';
import { ResponseInterceptor } from './infrastructure/ResponseInterceptor';
import { HttpExceptionFilter } from './infrastructure/HttpExceptionFilter';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  
  app.use(json({limit: '100kb'}));                       
  app.use(urlencoded({limit: '100kb', extended: true})); 
  app.useGlobalInterceptors(new ResponseInterceptor());  
  app.useGlobalFilters(new HttpExceptionFilter());       
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('BID API')
    .setDescription('Modulo de licitações Trizy')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env['PORT']);
}
bootstrap();
