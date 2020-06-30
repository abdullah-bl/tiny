const { remote } = window.require('electron')
export { RoomSchema, ReservationSchema, GustSchema } from './schemas'
export { default as db } from './db'
export { beforeInsertRoom } from './extra'
export { default as islamicDate } from './islamicDate'

const { Menu, MenuItem } = remote

export const Alert = options => remote.dialog.showMessageBoxSync(options)
export const currentWindow = window.currentWindow = remote.getCurrentWindow()
export const getSizes = () => {
  const { width, height } = currentWindow.getBounds()
  return { width, height }
}

export const setSizes = bounds => currentWindow.setBounds(bounds)
export { remote, Menu, MenuItem }