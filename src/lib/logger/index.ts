class Logger {
  constructor(prefix: string) {
    this.prefix = prefix;
  }

  private prefix: string;
  error(...data: any[]): void {
    /*@preserve*/ console.error(this.prefix, ...data);
  }

  info(...data: any[]): void {
    /*@preserve*/ console.info(this.prefix, ...data);
  }

  log(...data: any[]): void {
    /*@preserve*/ console.log(this.prefix, ...data);
  }

  warn(...data: any[]): void {
    /*@preserve*/ console.warn(this.prefix, ...data);
  }
}

export const logger = new Logger("[keybr++]");
