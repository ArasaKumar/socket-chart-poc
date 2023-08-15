import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket'
import OrganizationChart from "@dabeng/react-orgchart";


 

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
  const [time, setTime] = useState("");
  const [nodeData, setNodeData] =useState({});

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
    function onNodeDataChangeEvent(value){
      setNodeData(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('time', onTimeChangeEvent);
    socket.on('node', onNodeDataChangeEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('time', onTimeChangeEvent);
      socket.off('node', onNodeDataChangeEvent);
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
  <OrganizationChart datasource={nodeData}    />
    </>
  )
}

export default App
