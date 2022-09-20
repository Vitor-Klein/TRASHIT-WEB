import React from 'react'

import Union from '../../assets/Union.svg'
import './styles.css'

function MarkerCustom() {

  return (
    <div className='mapMarker'>
      <div className='mapMarkerContainer'>
        <img className='mapMarkerImage' src='https://www.larplasticos.com.br/wp-content/uploads/2018/06/lixeiras-de-coleta-seletiva-larplasticos-2.jpg' />
        <h3 className='mapMarkerTitle'>Teste</h3>
      </div>
      <div className='triangle'></div>
    </div>

  )
}

export default MarkerCustom