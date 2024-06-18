import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttBrokerModule } from './broker/broker.module';

@Module({
  imports: [
    MqttBrokerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
