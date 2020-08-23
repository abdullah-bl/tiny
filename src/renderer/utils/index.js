const { remote } = window.require('electron')
export { RoomSchema, ReservationSchema, GustSchema, CommandSchema, UpdateRoomSchema, AddPatchSchema } from './schemas'
export { default as db } from './db'
export { beforeInsertRoom, groupBy, setColor, ChangeStatus, CountNights, NightsText, years, reportsOptions, Backup, Restore } from './extra'
export { default as islamicDate } from './islamicDate'

const { Menu, MenuItem, dialog } = remote

export const Alert = options => dialog.showMessageBoxSync(options)
export const currentWindow = window.currentWindow = remote.getCurrentWindow()
export const getSizes = () => {
  const { width, height } = currentWindow.getBounds()
  return { width, height }
}

export const setSizes = bounds => currentWindow.setBounds(bounds)
export { remote, Menu, MenuItem, dialog }