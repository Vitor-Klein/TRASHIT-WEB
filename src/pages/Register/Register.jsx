import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/fullLogo.svg'
import logo from '../../assets/logo.svg'

import './styles.css'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            name,
            email,
            password,
            cnpj,
            number: whatsapp,
            city,
            uf,
        };

      try {
        await api.post('user', data)
        alert("Cadastro realizado com sucesso!!")
        navigate(`/points`);
      } catch (err) {
          alert(err)
      }
    }
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

            <Link className='back-link' to="/signIn">
              <FiArrowLeft size={16} color='#2ead65' />
              Voltar para o Login
            </Link>
          </section>

          <form onSubmit={handleRegister}>
            <input
              placeholder='Nome Fantasia'
              value={name}
              onChange={e => setName(e.target.value)}
            />

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
             <input
              placeholder='Cnpj'
              value={cnpj}
              onChange={e => setCnpj(e.target.value)}
            />
            <input
              placeholder='Whatsapp'
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />

            <div className="input-group">
              <input
                placeholder='Cidade'
                value={city}
                onChange={e => setCity(e.target.value)}
              />

              <input
                placeholder='UF'
                style={{ width: 80 }}
                value={uf}
                onChange={e => setUf(e.target.value)}
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