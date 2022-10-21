import React from 'react'

import Union from '../../assets/Union.svg'
import './styles.css'

function MarkerCustom(pointImage: any) {
  // pointImage = new Blob([pointImage.pointImage], { type: 'image/*' })
  // const convertImage = URL.createObjectURL(pointImage)
  console.log(pointImage.pointImage)
  return (
    <div className='mapMarker'>
      <div className='mapMarkerContainer'>
        <img className='mapMarkerImage' src={pointImage.pointImage} />
        <h3 className='mapMarkerTitle'>Teste</h3>
      </div>
      <div className='triangle'></div>
    </div>

  )
}

export default MarkerCustom