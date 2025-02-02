const ws = new WebSocket("ws://" + location.host);

ws.onmessage = () => location.reload();