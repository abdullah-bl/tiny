const { remote } = window.require('electron')
export { RoomSchema, ReservationSchema } from './schemas'


export const Alert = options => remote.dialog.showMessageBoxSync(options)
export const currentWindow = window.currentWindow = remote.getCurrentWindow()
export const getSizes = () => {
  const { width, height } = currentWindow.getBounds()
  return { width, height }
}

export const setSizes = bounds => currentWindow.setBounds(bounds)
export default remote