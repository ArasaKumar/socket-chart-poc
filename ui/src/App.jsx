import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket'


 

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
  const [time, setTime] = useState("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onTimeChangeEvent(value) {
      setTime(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('time', onTimeChangeEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onTimeChangeEvent);
    };
  }, []);

  return (
    <>
      <h1>React websocket poc</h1>
      <div className="card">
          <p>
          {isConnected? "Connected": "Not connected"}
        </p>
        <p>Time : {time}</p>
      </div>
      
    </>
  )
}

export default App
