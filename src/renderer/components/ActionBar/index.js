


import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'

function ActionBar({ history: { goBack }, actions = [] }) {
  return (
    <header>
      <a className='active' style={{ padding: '10px 20px' }} onClick={goBack}> للخلف </a>
      {actions && actions.map((action, key) => <a key={key} className={action.disabled ? 'disabled' : 'none'} style={action.style} onClick={action.onClick}>{action.label}</a>)}
    </header>
  )
}


export default withRouter(ActionBar)