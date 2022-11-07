import React from 'react'

import Union from '../../assets/Union.svg'
import './styles.css'

function MarkerCustom(props: any) {
  // pointImage = new Blob([pointImage.pointImage], { type: 'image/*' })
  // const convertImage = URL.createObjectURL(pointImage)
  return (
    <div className='mapMarker'>
      <div className='mapMarkerContainer'>
        <img className='mapMarkerImage' src={props.pointImage} />
        <h3 className='mapMarkerTitle'>{props.pointName}</h3>
      </div>
      <div className='triangle'></div>
    </div>

  )
}

export default MarkerCustom