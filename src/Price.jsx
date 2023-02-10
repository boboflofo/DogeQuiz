import React from 'react'

export default function Price(props) {
  return (
    <span className = 'worth'>
      {((props.data.length > 0 ? props.data[0].current_price : '') * props.coins).toFixed(2)} USD
    </span>
  )
}