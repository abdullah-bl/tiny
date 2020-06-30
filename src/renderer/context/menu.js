
import React, { useEffect } from 'react'


const ContextMenu = ({ menu }) => {
  useEffect(() => {
    window.addEventListener('contextmenu', e => {
      console.log('contextmenu', e.target)
    })
    return () => window.removeEventListener('contextmenu', () => {
      console.log('removed')
    })
  }, [])
  return null
}

export default ContextMenu