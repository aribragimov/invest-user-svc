import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PortfolioModule } from './domain/portfolio';
import { TransactionModule } from './domain/transaction';
import { UserModule } from './domain/user';
import { SvcConfigModule } from './config';
import { HealthController } from './health';

const modules = [UserModule, PortfolioModule, TransactionModule];

@Module({
  imports: [
    HttpModule,
    SvcConfigModule,
    ConfigModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<{ database: TypeOrmModuleOptions }, true>) =>
        configService.get('database'),
    }),
    ...modules,
  ],
  controllers: [HealthController],
})
export class AppModule {}
