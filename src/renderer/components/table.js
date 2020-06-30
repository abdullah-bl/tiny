

import React from 'react'

const Table = ({ rows = [], children }) => {
  return (
    <table>
      <tr>
        {rows.map((row, index) => <th key={index}>{row}</th>)}
      </tr>
      {children}
    </table>
  )
}

export default Table