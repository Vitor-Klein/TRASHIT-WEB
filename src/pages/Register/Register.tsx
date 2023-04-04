import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import axios from 'axios';
import InputMask from 'react-text-mask';

import api from '../../services/api'

import logoImg from '../../assets/fullLogo.svg'
import logo from '../../assets/logo.svg'

import './styles.css'

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [selectedUf, setSelectedUf] = useState('0')
    const [selectedCity, setSelecdetCity] = useState('0')
    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    const navigate = useNavigate();

    const cnpjMask = [
      /[0-9]/,
      /[0-9]/,
      '.',
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
      '.',
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
      '/',
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
      '-',
      /[0-9]/,
      /[0-9]/,
    ];
    const phoneMaskWithDDD = [
      '(', 
      /[1-9]/, 
      /\d/, 
      ')',
      ' ', 
      /\d/, 
      /\d/, 
      /\d/, 
      /\d/, 
      /\d/, 
      '-', 
      /\d/, 
      /\d/, 
      /\d/, 
      /\d/
    ];


    useEffect(() => {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
        const ufInitials = response.data.map(uf => uf.sigla)
  
        setUfs(ufInitials)
      })
    },[])

    useEffect(() => {
      if(selectedUf === '0') {
        return
      }
      axios
        .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
          const cityNames = response.data.map(city => city.nome)
  
          setCities(cityNames)
      })
  
    }, [selectedUf])

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
      const uf = event.target.value
  
      setSelectedUf(uf)
    }
  
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
      const city = event.target.value
  
      setSelecdetCity(city)
    }

    async function handleRegister(e: FormEvent) {
        e.preventDefault()

        const uf = selectedUf
        const city = selectedCity

        const data = {
            name,
            email,
            password,
            cnpj,
            number: whatsapp,
            city,
            uf,
            adm: true
        };

      try {
        await api.post('user', data)
        alert("Cadastro realizado com sucesso!!")
        navigate(`/signIn`);
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
            <p>
              Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar
              os melhores lugares para descartar seu lixo.
            </p>

            <Link className='back-link' to="/signIn">
              <FiArrowLeft size={16} color='#2ead65' />
              Voltar para o Login
            </Link>
          </section>

          <form onSubmit={handleRegister}>
            <Input
              placeholder='Nome Fantasia'
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <Input
              type="email" 
              placeholder='E-mail'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              type="password" 
              placeholder='Senha'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
             <InputMask
              mask={cnpjMask}
              placeholder='Cnpj'
              value={cnpj}
              onChange={e => setCnpj(e.target.value)}
            />
            <InputMask
              mask={phoneMaskWithDDD}
              placeholder='Whatsapp'
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />

            <div className="input-group">
              <div className="field">
                <label htmlFor="uf"></label>
                <select 
                    name="uf" 
                    id="uf" 
                    value={selectedUf} 
                    onChange={handleSelectUf}
                  >
                  <option value="0">Selecione uma UF</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="city"></label>
                <select 
                  name="city" 
                  id="city"
                  value={selectedCity}
                  onChange={handleSelectCity}
                >
                  <option value="0">Selecione uma Cidade</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <button className="button" type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register