import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Player, Controls } from '@lottiefiles/react-lottie-player'

import './styles.css'
import logo from '../../assets/logo.svg'

import HomeAnimation from '../../animations/homeAnimation.json'

function Home() {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>

        <main>

          <div className='content'>
            <h1>Seu marketplace de coleta de resíduos.</h1>
            <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

            <Link to="/signIn">
              <strong>Entrar</strong>
            </Link>

            <Link to="/signUp">
              <strong>Cadastrar-se</strong>
            </Link>
          </div>

          <Player
            autoplay
            loop
            src={HomeAnimation}
            style={{ height: '500px', width: '500px' }}
          >
            <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
          </Player>
        </main>
      </div>
    </div>
  )
}

export default Home
