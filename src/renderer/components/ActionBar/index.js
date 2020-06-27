


import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { ArrowRight } from 'react-feather'

function ActionBar({ history: { goBack }, back, children }) {
  return (
    <div className='action-panel'>
      {back &&
        <a className='active' style={{ padding: '10px 20px' }} onClick={goBack}>
          <span>للخلف</span>
          <ArrowRight />
        </a>
      }
      {children}
    </div>
  )
}


export default withRouter(ActionBar)