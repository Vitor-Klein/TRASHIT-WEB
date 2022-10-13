import React from 'react'

import Union from '../../assets/Union.svg'
import './styles.css'

function MarkerCustom(pointImage: any) {

  return (
    <div className='mapMarker'>
      <div className='mapMarkerContainer'>
        <img className='mapMarkerImage' src={pointImage} />
        <h3 className='mapMarkerTitle'>Teste</h3>
      </div>
      <div className='triangle'></div>
    </div>

  )
}

export default MarkerCustom