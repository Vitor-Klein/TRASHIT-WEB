import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'
import { FiLogIn } from 'react-icons/fi'
import axios from 'axios'
import api from '../../services/api'

import './styles.css'
import logo from '../../assets/logo.svg'

import LoginAnimation from '../../animations/peoples.json'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function handleRegister(e: FormEvent) {
    e.preventDefault()

  try {
    await api.get(`user/authent`,{ params: { email,password } })
    alert('Acesso Autorizado!')
    navigate(`/pontos`);

  } catch (err) {
      alert(err)
  }
}

  return (
    <div className="container">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" className="logo" />
        </header>

        <main>

          <div className='infos'>
            <p className="titulo">Faça seu login.</p>

            <form onSubmit={handleRegister}>
            <input
              type="email" placeholder='E-mail'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password" placeholder='Senha'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button type="submit" className="signIn" >
              <Link to="/signIn">
                <strong>Entrar</strong>
              </Link>
            </button>

            <Link className='linkButton' to="/signUp">
              <FiLogIn size={20} color='#2ead65' style={{ marginRight: '10px' }} />
              Não tenho cadastro
            </Link>

            <Link className="linkButton" to="/forgotPassword">
              <span>Esqueci minha senha</span>
            </Link>
            </form>
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