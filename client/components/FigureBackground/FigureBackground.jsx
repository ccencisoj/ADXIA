import React from 'react'
import View from './View'

function FigureBackground({top, right, bottom, left, src, rotate}) {
    const coordinates = {
        top,
        right,
        bottom,
        left,
        rotate: `${rotate}deg `
    }
  return (
    <View coordinates={coordinates} src={src}/>
  )
}

export default FigureBackground