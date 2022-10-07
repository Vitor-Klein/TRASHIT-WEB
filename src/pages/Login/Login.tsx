import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Input, Form, Button } from 'antd'
import {
  MailOutlined,
  LockOutlined
} from '@ant-design/icons'
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
    try {
      await api.get(`user/authent`, { params: { email, password } })
//salvar o usuario no localstorage para usar futuramente nas paginas
      alert('Acesso Autorizado!')
      navigate(`/pontos`);
    } catch (err) {
      alert(err.response.data.message)
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

            <Form
              onFinish={handleRegister}
              autoComplete="off"
            >
              <Form.Item
                required
                rules={[
                  {
                    required: true,
                    message: 'Informe seu email!',
                  },
                ]}
              >
                <Input
                  placeholder="Email"
                  autoCapitalize="none"
                  type='email'
                  value={email}
                  className="input"
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                required
                rules={[
                  {
                    required: true,
                    message: 'Informe seu email!',
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder='Senha'
                  value={password}
                  className="input"
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="signIn"
                >Entrar
                </Button>
              </Form.Item>

              <Link className='linkButton' to="/signUp">
                <FiLogIn size={20} color='#2ead65' style={{ marginRight: '10px' }} />
                Não tenho cadastro
              </Link>

              <Link className="linkButton" to="/forgotPassword">
                <span>Esqueci minha senha</span>
              </Link>
            </Form>
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