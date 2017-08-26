import * as io from "socket.io-client";
import Config from "../config";

class Socket {
  private static socket = io(Config.getHostUrl());
  private routes: Array<string>;
  private storage;
  private dispatch;

  constructor(dispatch: Function) {
    this.dispatch = dispatch;
    this.storage = {};
  }

  static getSocket() {
    return Socket.socket;
  }

  setRoutes(routes: Array<string>) {
    this.routes = routes;
  }

  listen() {
    this.routes.forEach(route => {
      Socket.socket.on(route, data => {
        route !== "init" ? this.storage[route] = data : this.storage = data;
        this.dispatch({storage: this.storage});
      });
    });
  }
}

export default Socket;