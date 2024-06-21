import { Injectable, OnApplicationBootstrap, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
const aedes = require('aedes')()
const { createServer } = require('aedes-server-factory')


export interface BrokerService {
  
}



@Injectable()
export class MqttBrokerService implements BrokerService, OnModuleInit, OnApplicationBootstrap {
  private broker = aedes;

  constructor(
    private readonly userService: UserService,
  ) {}
  
  onModuleInit() {
    // this.broker = aedes();
  }

  onApplicationBootstrap() {
    const port = 1883
    const server = createServer(this.broker);
    this.broker.authenticate = this.authenticate;
    aedes.info = this.getInfo();
    
    // aedes.on('client', (client) => {
    //   console.log(`Client Connected: ${client.id}`);
    // });

    // aedes.on('clientDisconnect', (client) => {
    //   console.log(`Client Disconnected: ${client.id}`);
    // });

    // aedes.on('subscribe', (subscriptions, client) => {
    //   console.log(`Client ${client.id} subscribed to topics: ${subscriptions.map(s => s.topic).join(', ')}`);
    // });

    // aedes.on('unsubscribe', (subscriptions, client) => {
    //   console.log(`Client ${client.id} unsubscribed from topics: ${subscriptions.join(', ')}`);
    // });

    // aedes.on('publish', (packet, client) => {
    //   const topic = packet.topic;
    //   const payload = packet.payload.toString();
    //   console.log(`Client ${client ? client.id : 'BROKER'} published to topic ${topic}: ${payload}`);
    // });

    server.listen(port, function () {
      console.log('server started and listening on port ', port);
    });

    this.broker.on('client', (client) => {
      console.log(`Client Connected: ${client.id}`);
    });

    this.broker.on('clientDisconnect', (client) => {
      console.log(`Client Disconnected: ${client.id}`);
    });

    this.broker.on('subscribe', (subscriptions, client) => {
      console.log(`Client ${client.id} subscribed to topics: ${subscriptions.map(s => s.topic).join(', ')}`);
    });

    this.broker.on('unsubscribe', (subscriptions, client) => {
      console.log(`Client ${client.id} unsubscribed from topics: ${subscriptions.join(', ')}`);
    });

    this.broker.on('publish', (packet, client) => {
      const topic = packet.topic;
      const payload = packet.payload.toString();
      console.log(`Client ${client ? client.id : 'BROKER'} published to topic ${topic}: ${payload}`);
    });
  }

  async authenticate(client, username, password, callback) { // : Promise<Partial<User> | null>
    
    // console.log('username', username, 'password', password);
    // const result = await this.userService.findOneByName("gg");
    
    // console.log('result', result);
    console.log('username', username, 'password', password);
    

    // if (result === null) {
    //   return null
    // }
    
    // if (result && (await bcrypt.compare(password, result.password))) {
    //   const { password, ... res } = result;
    //   return res;
    // }
    // return null
    
    if (username === 'george' && password.toString() === '123') {
      console.log('login successful');
      callback(null, true);
      console.log('Number of connected clients:', aedes.connectedClients);
    } else {
      console.log('login failure.');
      callback(null, false);
    }
  }

  async getInfo() {
    console.log('Aedes ID: ', aedes.id);
    console.log('Number of connected clients:', aedes.connectedClients);
  }

}
