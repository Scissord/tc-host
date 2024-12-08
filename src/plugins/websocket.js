import { reactive } from "vue";

const state = reactive({
  socket: null,
  isConnected: false,
  listeners: {},
});

export function initWebSocket(url) {
  if (state.socket) {
    console.warn("WebSocket уже инициализирован");
    return;
  }

  const connect = () => {
    state.socket = new WebSocket(url);

    state.socket.onopen = () => {
      console.log("WebSocket подключен");
      state.isConnected = true;
    };

    state.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Получено сообщение:", data);

      if (data.event && state.listeners[data.event]) {
        state.listeners[data.event].forEach((callback) => callback(data.payload));
      }
    };

    state.socket.onclose = () => {
      console.log("WebSocket отключен");
      state.isConnected = false;
    };

    state.socket.onerror = (error) => {
      console.error("Ошибка WebSocket:", error);
    };
  };

  const send = (event, payload) => {
    if (state.socket && state.socket.readyState === WebSocket.OPEN) {
      state.socket.send(JSON.stringify({ event, payload }));
    } else {
      console.error("WebSocket не подключен");
    }
  };

  const on = (event, callback) => {
    if (!state.listeners[event]) {
      state.listeners[event] = [];
    }
    state.listeners[event].push(callback);
  };

  const disconnect = () => {
    if (state.socket) {
      state.socket.close();
    }
    state.socket = null;
  };

  connect();

  return {
    state,
    send,
    on,
    disconnect,
  };
}
