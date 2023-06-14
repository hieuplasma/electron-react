// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent, desktopCapturer, SourcesOptions } from 'electron';
import {BrowserWindow} from '@electron/remote'
import { createScreenshotWindow } from './crop/crop';

export type Channels = 'ipc-example' | 'key-shortcut';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      let subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    capture() {
      ipcRenderer.on('key-shortcut', function(args){
        console.log("making bur bur");
        createScreenshotWindow(1);
    })
    }
  },
  // desktopCapturer:{
  //   getResource(type: SourcesOptions, func?: (...args: unknown[]) => void) {
  //       desktopCapturer.getSources(type).then(func)
  //   },
  // },
  // BrowserWindow
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;