import React from 'react'
import { currentWindow } from '../../utils'

const Controls = () => {
  const close = () => currentWindow.close()
  const minimize = () => currentWindow.minimize()
  return (
    <div className='controls'>
      <span id='close' onClick={close}></span>
      <span id='minimize' onClick={minimize}></span>
    </div>
  )
}

export default Controls