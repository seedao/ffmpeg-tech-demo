import React, { useRef, useEffect } from 'react';
import { Player } from 'video-react';
import './App.css';
import "../node_modules/video-react/dist/video-react.css";

function App() {
  const processRef = useRef();
  useEffect(() => {
    const interval = setInterval(() => {
      if(processRef&&processRef.current&&processRef.current.getState()){
        console.log('currentTime',processRef.current.getState().player.currentTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [])
  setInterval(console.log('ref', processRef), 1000);
  return (
    <div className="App" onContextMenu={(e) => e.preventDefault()}>
      <header className="App-header">
        <Player
          ref={processRef}
          src="https://bafybeibvxarcnmdgx47a6ynzwnidelhmdhvgcoeh54n3csp5lqfogm7u24.ipfs.dweb.link/output.mp4"
        />
      </header>
    </div>
  );
}

export default App;
