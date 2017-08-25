import * as io from "socket.io-client";

class Socket {
	private socket;
	private routes: Array<string>;
	private storage;
	private dispatch;

	constructor(url: string, dispatch: Function) {
		this.socket = io(url);
		this.dispatch = dispatch;
		this.storage = {};
	}

	setRoutes(routes: Array<string>) {
		this.routes = routes;
	}

	listen() {
		this.routes.forEach(route => {
      this.socket.on(route, data => {
        route !== "init" ? this.storage[route] = data : this.storage = data;
        this.dispatch({storage: this.storage});
      });
    });
	}
}

export default Socket;