import { Module } from '@nestjs/common';
import { MqttBrokerService } from './mqtt-broker.service';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [UserModule],
  providers: [MqttBrokerService],
  exports: [MqttBrokerService],
})
export class MqttBrokerModule {}
