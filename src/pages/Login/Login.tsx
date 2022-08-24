import React from 'react'
import { Link } from 'react-router-dom'
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import { FiLogIn } from 'react-icons/fi'

import './styles.css'
import logo from '../../assets/logo.svg'

import LoginAnimation from '../../animations/peoples.json'
function Login() {
  return (
    <div className="container">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>

        <main>

          <div className='infos'>
            <p className="titulo">Faça seu login.</p>

            <input type="text" placeholder="Nome" />
            <input type="text" placeholder="E-mail" />

            <Link className="signIn" to="/signUp">
              <strong>Entrar</strong>
            </Link>

            <Link className='linkButton' to="/signUp">
              <FiLogIn size={20} color='#2ead65' style={{ marginRight: '10px' }} />
              Não tenho cadastro
            </Link>

            <Link className="linkButton" to="/forgotPassword">
              <span>Esqueci minha senha</span>
            </Link>
          </div>

          <Player
            autoplay
            loop
            src={LoginAnimation}
            style={{ height: '700px', width: '700px' }}
          >
            <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
          </Player>
        </main>
      </div>
    </div>
  )
}

export default Login