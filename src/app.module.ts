import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModuleModule } from './customer-module/customer-module.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import entities from './typeorm';

console.log("process environment ", process.env.DB_NAME, process.env.DB_HOST);

@Module({
  imports: [
    ConfigModule.forRoot({    // not even working
      isGlobal: true,
      envFilePath: '.env',
    }),
    CustomerModuleModule, 
    UsersModule, 
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'DESKTOP-UALTGVT',
      port: 1433,
      username: 'enterprise',
      password: 'entx!2003n',
      database: 'NestJsTutorial',
      entities,
      synchronize: true,
      autoLoadEntities: true,
      extra: {
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
      },
    }), AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
