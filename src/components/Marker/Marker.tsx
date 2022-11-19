import React from 'react'
import Union from '../../assets/Union.svg'
import './styles.css'

function MarkerCustom(props: any) {
  let boolAproved = false;
  let boolPending = false;
  if(props.pointStatus === 'Aprovado') {
    boolAproved = true;
  } else if(props.pointStatus === 'Pendente') {
    boolPending = true;
  }
  return (
    <>
      <div className='mapMarker'>
        <div className={`mapMarkerContainer ${boolPending ? 'pending' : '' ||
          boolAproved? 'aproved' : ''}`}>
          <img className='mapMarkerImage' src={props.pointImage} />
          <h3 className='mapMarkerTitle'>{props.pointName}</h3>
        </div>
        <div className={`triangle ${boolPending? 'pending-triangle' : '' || 
          boolAproved? 'aproved-triangle' : ''}`}>
        </div>

      </div>
    </>
  )
}

export default MarkerCustom