import { Button } from "antd"
import { LeafletMouseEvent } from 'leaflet'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'


import Dropzone from '../../components/Dropzone/Dropzone'

import './styles.css'

import logo from '../../assets/logo.svg'

interface Item {
  id: number
  title: string
  imageData: string
}

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([])
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cellphone: '',
    cep: ''
  })

  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCity, setSelecdetCity] = useState('0')
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
  const [selectedFile, setSelectedFile] = useState<string>()
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const user = localStorage.getItem('user')
  const userData = JSON.parse(`${user}`)

  useEffect(() => {
    if (!userData) {
      navigate('/signIn')
    } else {
      navigate('/createPoint')

    }
  }, [])

  useEffect(() => {
    async function loadPosition() {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords

        setInitialPosition([latitude, longitude])
      })
    }
    loadPosition()
  }, [])

  useEffect(() => {
    api.get('/category').then(response => {
      setItems(response.data)
    })
  }, [])

  // useEffect(() => {
  //   axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
  //     const ufInitials = response.data.map(uf => uf.sigla)

  //     setUfs(ufInitials)
  //   })
  // }, [])

  // useEffect(() => {
  //   if (selectedUf === '0') {
  //     return
  //   }
  //   axios
  //     .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
  //     .then(response => {
  //       const cityNames = response.data.map(city => city.nome)

  //       setCities(cityNames)
  //     })

  // }, [selectedUf])

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value

    setSelectedUf(uf)
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value

    setSelecdetCity(city)
  }

  function HandleMapClick() {
    const map = useMapEvents({
      click: (e: LeafletMouseEvent) => {
        setSelectedPosition([
          e.latlng.lat,
          e.latlng.lng,
        ])
      },
    })

    return selectedPosition === null ? null : (
      <Marker
        key={initialPosition[0]}
        position={selectedPosition}
        interactive={false}
      // icon={L.divIcon({ className: "custom icon", html: ReactDOMServer.renderToString(<MarkerCustom />) })}
      >
      </Marker>
    )

  }

  function handelInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
  }

  async function getCep() {
    const { cep } = formData;

    const userCep = await api.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
    setSelectedUf(userCep.data.state)
    setSelecdetCity(userCep.data.city)
    console.log(userCep.data.city);
  }

  function handleSelectItem(id: number) {
    const alredySelected = selectedItems.findIndex(item => item === id)

    if (alredySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }

  }

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault()

      const { name, email, cellphone } = formData
      const uf = selectedUf
      const city = selectedCity
      const [latitude, longitude] = selectedPosition
      const items = selectedItems.join(',')

      let data = {
        name,
        email,
        cellphone,
        uf,
        city,
        country: 'Brasil',
        latitude,
        longitude,
        items,
        image: selectedFile,
        id_user: userData.data.id,
        description: 'teste',
        status: 'teste'
      }
      // console.log(data);


      await api.post('/pontocoleta', data)

      alert('Ponto de coleta criado!')
      navigate('/pontos')

    } catch (err) {
      setErrorMessage(err.response.data.message);
    }

  }

  return (
    <div className="pageCreatePoint">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/pontos">
          <FiArrowLeft />
          Voltar para Pontos
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <Dropzone onFileUplouded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da Entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handelInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handelInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="cellphone">Whatsapp</label>
              <input
                type="text"
                name="cellphone"
                id="cellphone"
                onChange={handelInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                name="cep"
                id="cep"
                onChange={handelInputChange}
              />
              <Button onClick={getCep}>Validar Cep</Button>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          {initialPosition[0] !== 0 && (
            <MapContainer center={initialPosition} zoom={15}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <HandleMapClick />
            </MapContainer>
          )}

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado(UF)</label>
              <input
                name="uf"
                id="uf"
                value={selectedUf}
              ></input>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <input
                name="city"
                id="city"
                value={selectedCity}
              ></input>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítems abaixo</span>
          </legend>
          <ul className="itemsGrid">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? "selected" : ""}
              >
                <img
                  src={`http://localhost:3400/uploads/${item.imageData}`}
                  alt={item.title}
                />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <div className="BoxError">
          <strong className="errorMessage">{errorMessage}</strong>
        </div>

        <button type="submit">Cadastrar Ponto De Coleta</button>
      </form>
    </div>
  );
}

export default CreatePoint