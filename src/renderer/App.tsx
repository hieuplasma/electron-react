import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

window.electron.ipcRenderer.on('key-shortcut', function(args){
  console.log('hihihaha',args)
  // createScreenshotWindow(1)
})

window.electron.ipcRenderer.on('take-img', function(args){
  console.log('img ne',args)
  // createScreenshotWindow(1)
})


function Hello() {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
          <button type="button" onClick={()=> window.electron.ipcRenderer.sendMessage('key-shortcut', [1])}>
          <span role="img" aria-label="books" >
              📚
            </span>
             Read our docs
          </button>
      
          <button type="button" onClick={()=> window.electron.ipcRenderer.sendMessage('key-shortcut', [1])}>
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
       
      </div>
      <script src="./component/crop.js">
    </script>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
