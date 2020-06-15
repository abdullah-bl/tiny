const Store = window.require('electron-store')
const { remote } = window.require('electron')
const { is } = window.require('electron-util')

const store = new Store({
  name: 'store',
  fileExtension: '',
  cwd: is.development ? remote.app.getAppPath() : remote.app.getPath('userData')
})

export const setStore = args => store.set(args)
export const getStore = () => store.get()
export const clearStore = () => {
  store.clear()
  location.reload()
}