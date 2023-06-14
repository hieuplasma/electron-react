import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

window.electron.ipcRenderer.on('key-shortcut', function(args){
  console.log('hihihaha' + args)
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
          <button type="button" onClick={()=> window.electron.ipcRenderer.capture()}>
          <span role="img" aria-label="books" >
              📚
            </span>
             Read our docs
          </button>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
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
