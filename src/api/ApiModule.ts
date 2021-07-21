
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationProvider } from 'src/application/ApplicationProvider';
import { DbConfiguration } from 'src/typeorm/DbConfiguration';
import { UnitOfWork } from 'src/typeorm/UnitOfWork';
import { AuthorizeGuard } from './infrastructure/AuthorizeGuard';
import { AuthorizeMiddleware } from './infrastructure/AuthorizeMiddleware';
import { ParseNumberPipe } from './infrastructure/pipe/ParseNumberPipe';
import { Routes } from './Routes';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DbConfiguration.get()),
  ],
  controllers: Routes,
  providers: [
    ...ApplicationProvider,
    UnitOfWork,
    ParseNumberPipe,
    {
      provide: APP_GUARD,
      useClass: AuthorizeGuard,
    },
  ],
})

export class ApiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizeMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}