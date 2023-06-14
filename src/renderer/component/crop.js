const {ipcRenderer} = window.electron
// import {desktopCapturer,BrowserWindow} from 'electron'
// import {BrowserWindow} from '@electron/remote'

var imgCropWindow;

export function createScreenshotWindow(requestType) {
    console.log('create')
    takeScreenshot(function (imageURL) {
        var request = {
            imageURL: imageURL,
            type: requestType
        }

        // imgCropWindow = new BrowserWindow({
        //     frame: false,
        //     fullscreen: true,
        //     show: false,
        //     webPreferences: {
        //         nodeIntegration: true,
        //         // contextIsolation: false,
        //         enableRemoteModule: true
        //     }
        // })
        // imgCropWindow.loadFile('mask.html').then(() => {
        //     imgCropWindow.webContents.send('request-object', request);
        // })

        // imgCropWindow.once('ready-to-show', () => {
        //     imgCropWindow.show()
        // })
    }, 'image/png');
}

// 1 - Mask to crop the image
// 2 - Mask to extract text

function takeScreenshot(callback, imageFormat) {
    var _this = this;
    // this.callback = callback;
    imageFormat = imageFormat || 'image/jpeg';

    const handleStream = (stream) => {
        // _this.callback("s")
        // Create hidden video tag
        var video = document.createElement('video');
        video.style.cssText = 'position:absolute;top:-10000px;left:-10000px;';

        // Event connected to stream
        video.onloadedmetadata = function () {
            // Set video ORIGINAL height (screenshot)
            video.style.height = this.videoHeight + 'px';
            video.style.width = this.videoWidth + 'px';

            video.play();
            var canvas = document.createElement('canvas');
            canvas.width = this.videoWidth;
            canvas.height = this.videoHeight;
            var ctx = canvas.getContext('2d');
            // Draw video on canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            if (callback) {
                callback(canvas.toDataURL(imageFormat));
                return 0;
            } else {
                console.log('Need callback!');
            }
            video.remove();
            try {
                stream.getTracks()[0].stop();
            } catch (e) { }
        }

        video.srcObject = stream;
        document.body.appendChild(video);
    };

    const handleError = function (e) {
        console.log(e);
    };

    // desktopCapturer.getResource({ types: ['window', 'screen'] }).then(async sources => {
    //     for (const source of sources) {
    //         // Filter: main screen
    //         if ((source.name === "Entire Screen") || (source.name === "Screen 1") || (source.name === "Screen 2")) {
    //             try {
    //                 const stream = await navigator.mediaDevices.getUserMedia({
    //                     audio: false,
    //                     video: {
    //                         mandatory: {
    //                             chromeMediaSource: 'desktop',
    //                             chromeMediaSourceId: source.id,
    //                             minWidth: 1280,
    //                             maxWidth: 4000,
    //                             minHeight: 720,
    //                             maxHeight: 4000
    //                         }
    //                     }
    //                 });
    //                 handleStream(stream);
    //             } catch (e) {
    //                 handleError("my err", e);
    //             }
    //         }
    //     }
    // });
}