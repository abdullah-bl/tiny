

import React from 'react'

export const Input = ({ label, id, caption, ...rest }) => (
  <>
    {label && <label htmlFor={id}>{label}</label>}
    <input id={id} {...rest} />
    {caption && <small>{caption}</small>}
  </>
)

export const Select = ({ label, id, caption, options = [], ...rest }) => (
  <>
    {label && <label htmlFor={id}>{label}</label>}
    <select id={id} {...rest}>
      {options && options.map((op, key) =>
        <option key={key} value={op}>{op}</option>
      )}
    </select>
    {caption && <small>{caption}</small>}
  </>
)

export const TextArea = ({ label, id, caption, ...rest }) => (
  <>
    {label && <label htmlFor={id}>{label}</label>}
    <textarea id={id} {...rest} />
    {caption && <small>{caption}</small>}
  </>
)