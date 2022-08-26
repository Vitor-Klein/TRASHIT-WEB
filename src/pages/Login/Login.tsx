import React from 'react'
import { Link } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'
import { FiLogIn } from 'react-icons/fi'

import './styles.css'
import logo from '../../assets/logo.svg'

import LoginAnimation from '../../animations/peoples.json'
function Login() {
  return (
    <div className="container">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" className="logo" />
        </header>

        <main>

          <div className='infos'>
            <p className="titulo">Faça seu login.</p>

            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Senha" className="input" />

            <Link className="signIn" to="/signIn">
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
            className="animation"
          >
          </Player>
        </main>
      </div>
    </div>
  )
}

export default Login