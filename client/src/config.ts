class Config {
  private static host = "http://localhost";
  private static port = 8493;

  static getHostUrl() {
    return `${Config.host}:${Config.port}`;
  }
}

export default Config;