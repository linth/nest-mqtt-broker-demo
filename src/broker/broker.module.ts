import { Module } from '@nestjs/common';
import { MqttBrokerService } from './mqtt-broker.service';


@Module({
  imports: [],
  providers: [MqttBrokerService],
  exports: [MqttBrokerService],
})
export class MqttBrokerModule {}
