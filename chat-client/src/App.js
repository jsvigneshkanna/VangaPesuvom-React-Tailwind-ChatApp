import './App.css';
import socketIO from 'socket.io-client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './component/Join/Join';
import Chat from './component/Chat/Chat';

// starting socket client
const ENDPOINT = 'http://localhost:5000';
const socket = socketIO(ENDPOINT, {transports: ['websocket']});


function App() {
  // starting the client socket
  socket.on('connection', () => {

  })

  return (
    <div className="App">
      {/* defining the page routes */}
      <Router>
        <Route exact path='/' component={Join}></Route>
        <Route exact path='/chat' component={Chat}></Route>
      </Router>
    </div>
  );
}

export default App;
