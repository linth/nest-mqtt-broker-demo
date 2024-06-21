import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MqttBrokerModule } from './broker/broker.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    MqttBrokerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
