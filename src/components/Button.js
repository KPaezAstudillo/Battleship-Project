import React from 'react'

export default function Button({className, onClick, id, style, key, label}) {
  return (
    <button className={className} onClick={onClick} id={id} style={style} key={key}>{label}</button>

  )
}
