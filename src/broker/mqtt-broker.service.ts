import { Injectable, OnApplicationBootstrap, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
const aedes = require('aedes')()
const { createServer } = require('aedes-server-factory')


export interface BrokerService {
  
}



@Injectable()
export class MqttBrokerService implements BrokerService, OnModuleInit, OnApplicationBootstrap {
  constructor() {

  }
  
  onModuleInit() {

  }

  onApplicationBootstrap() {
    const port = 1883
    const server = createServer(aedes)

    server.listen(port, function () {
      console.log('server started and listening on port ', port)
    })
  }

}
