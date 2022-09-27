import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'

import './styles.css'
import logo from '../../assets/logo.svg'

import HomeAnimation from '../../animations/homeAnimation.json'


function CreatePoint() {
  const [file, setFile] = useState('')

  function convertImage() {
    const imageConvert = new Blob([file], {type: 'image'})
    
    const imgUrl = URL.createObjectURL(imageConvert)
    console.log(imgUrl)
  }
  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.value)} />

      <button onClick={() => convertImage()}>
        <h2>Salvar</h2>
      </button>
    </div>
  )
}

export default CreatePoint
