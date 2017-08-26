import * as io from "socket.io-client";
import Config from "../config";

export namespace Socket {
  export interface Route {
    path: string,
    onReceive: Function,
    handle?: string
  }
}

class Socket {
  private static socket = io(Config.getHostUrl());
  private routes: Array<Socket.Route>;
  private storage;

  constructor() {
    this.storage = {};
  }

  static getSocket() {
    return Socket.socket;
  }

  setRoutes(routes: Array<Socket.Route>) {
    this.routes = routes;
  }

  listen() {
    this.routes.forEach(route => {
      Socket.socket.on(route.path, data => {
        route.onReceive({[route.handle || route.path]: data});
      });
    });
  }
}

export default Socket;