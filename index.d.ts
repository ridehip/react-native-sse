export type Events = {
  message: {
    type: 'message';
    data: string | null;
    lastEventId: string | null;
    url: string;
  };
  open: {
    type: 'open';
  };
  close: {
    type: 'close';
  };
  timeout: {
    type: 'timeout';
  };
  error: {
    type: 'error';
    message: string;
    xhrState: number;
    xhrStatus: number;
  } | {
    type: 'exception';
    message: string;
    error: Error;
  };
}

export type EventType = keyof Events;

export interface CustomEvent<E extends string> {
  type: E;
  data: string | null;
  lastEventId: string | null;
  url: string;
}

export interface Logger {
  log: (...args: string[]) => void;
  info?: (...args: string[]) => void;
  warn?: (...args: string[]) => void;
  trace?: (...args: string[]) => void;
  error?: (...args: string[]) => void;
}

export interface EventSourceOptions {
  method?: string;
  timeout?: number;
  headers?: Record<string, any>;
  body?: any;
  logger?: Logger;
  pollingInterval?: number;
  timeoutBeforeConnection?: number;
}

export type EventSourceListener<E extends EventType | string> = (
  event: E extends EventType ? Events[E] : CustomEvent<E>
) => void;

declare class EventSource<E extends EventType | string = EventType> {
  static ERROR: -1;
  static CONNECTING: 0;
  static OPEN: 1;
  static CLOSED: 2;
  status: number;
  constructor(url: URL | string, options?: EventSourceOptions);
  open(): void;
  close(): void;
  addEventListener<T extends (E | EventType)>(type: T, listener: EventSourceListener<T>): void;
  removeEventListener<T extends (E | EventType)>(type: T, listener: EventSourceListener<T>): void;
  removeAllEventListeners<T extends (E | EventType)>(type?: T): void;
  dispatch<T extends (E | EventType)>(type: T, data: T extends EventType ? Events[T] : CustomEvent<T>): void;
}

export default EventSource;
