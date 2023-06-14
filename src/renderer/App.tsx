import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useEffect, useState } from 'react';

window.electron.ipcRenderer.on('key-shortcut', function (args) {
  console.log('hihihaha', args);
  // createScreenshotWindow(1)
});

function Hello() {
  const [imgCrop1, setImgCrop1] = useState<any>(false);
  const [imgCrop2, setImgCrop2] = useState<any>(false);
  const [imgCrop3, setImgCrop3] = useState<any>(false);

  const [currentImg, setCurrentImg] = useState<any>(false);

  useEffect(() => {
    if (!imgCrop1) {
      console.log('imgggg1', imgCrop1.toString().slice(0, 2));
      setImgCrop1(currentImg);
    } else if (!imgCrop2) {
      console.log('imgggg2');
      setImgCrop2(currentImg);
      return;
    } else if (!imgCrop3) {
      console.log('imgggg3');
      setImgCrop3(currentImg);
      return;
    }
  }, [currentImg]);

  window.electron.ipcRenderer.on('take-img', function (args) {
    console.log('imgggg');
    setCurrentImg(args);
    // createScreenshotWindow(1)
  });

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
        {imgCrop1 ? <img src={imgCrop1} width="200" height="200" /> : <></>}
        {imgCrop2 ? <img src={imgCrop2} width="200" height="200" /> : <></>}
        {imgCrop3 ? <img src={imgCrop3} width="200" height="200" /> : <></>}
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <button
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.sendMessage('key-shortcut', [1])
          }
        >
          <span role="img" aria-label="books">
            📚
          </span>
          Read our docs
        </button>

        <button
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.sendMessage('key-shortcut', [1])
          }
        >
          <span role="img" aria-label="folded hands">
            🙏
          </span>
          Donate
        </button>
      </div>
      <script src="./component/crop.js"></script>
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
