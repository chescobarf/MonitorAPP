import { IOClients } from '@vtex/api'

import Message from './message'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get message() {
    return this.getOrSet('message', Message)
  }
}
