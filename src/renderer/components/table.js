

import React from 'react'

const Table = ({ rows = [], children }) => {
  return (
    <table>
      <thead>
        <tr>
          {rows.map((row, index) => <th key={index}>{row}</th>)}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

export default Table