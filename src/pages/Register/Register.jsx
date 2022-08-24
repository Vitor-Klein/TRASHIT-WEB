import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from '../../assets/fullLogo.svg'
import logo from '../../assets/logo.svg'

import './styles.css'

function Register() {
  return (
    <>
      <header>
        <img src={logo} alt="Ecoleta" />
      </header>
      <div className="register-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" />

            <h1>Cadastro</h1>
            <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar os casos de sua ONG.</p>

            <Link className='back-link' to="/">
              <FiArrowLeft size={16} color='#2ead65' />
              Voltar para o Login
            </Link>
          </section>

          <form>
            <input
              placeholder='Nome Fantasia'
            />

            <input
              type="email" placeholder='E-mail'
            />
            <input
              placeholder='Whatsapp'
            />

            <div className="input-group">
              <input
                placeholder='Cidade'
              />

              <input
                placeholder='UF'
                style={{ width: 80 }}
              />
            </div>

            <button className="button" type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register