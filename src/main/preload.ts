// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { createScreenshotWindow } from './crop/crop';

export type Channels = 'ipc-example' | 'key-shortcut' | 'take-img';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      console.log(channel, args, ipcRenderer)
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
        console.log("add")
        createScreenshotWindow(3);
    })},
    capture2() {
      ipcRenderer.on('take-img', function(args){
        console.log("add")
        createScreenshotWindow(3);
    })},

    // closeCrop() {
    //   ipcRenderer.on('key-shortcut', function(args){
    //     console.log("close crop");
    // })}
  }
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;