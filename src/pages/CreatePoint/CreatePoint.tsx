import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios'
import { LeafletMouseEvent } from 'leaflet'
import api from '../../services/api'
import ReactDOMServer from 'react-dom/server'
import L from 'leaflet'

import Dropzone from '../../components/Dropzone/Dropzone'
import MarkerCustom from '../../components/Marker/Marker'

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
    whatsapp: '',
  })

  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCity, setSelecdetCity] = useState('0')
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
  const [selectedFile, setSelectedFile] = useState<File>()

  const navigate = useNavigate();

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

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng,
    ])
  }

  function handelInputChange( event: ChangeEvent<HTMLInputElement>) {
    const { name,value } = event.target

    setFormData({...formData, [name]: value})
  }

  function handleSelectItem(id: number) {
    const alredySelected = selectedItems.findIndex(item => item === id)

    if(alredySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }

  }

  async function handleSubmit(event:FormEvent ) {
      event.preventDefault()

      // const {name, email, whatsapp} = formData
      // const uf = selectedUf
      // const city = selectedCity
      // const [latitude, longitude] = selectedPosition
      // const items = selectedItems

      // const data = new FormData()

      // data.append('name',name)
      // data.append('email', email)
      // data.append('whatsapp',whatsapp)
      // data.append('uf', uf)
      // data.append('city', city)
      // data.append('latitude',String(latitude))
      // data.append('longitude',String(longitude))
      // data.append('items',items.join(','))
      
      // if(selectedFile) {
      //   data.append('image', selectedFile)
      // }
      
      // await api.post('points', data)

      // alert('Ponto de coleta criado!')
      // navigate('/')
      console.log(selectedFile)
  }

  return (
   <div className="pageCreatePoint">
     <header>
      <img src={logo} alt="Ecoleta"/>
      <Link to="/pontos">
        <FiArrowLeft />
        Voltar para Pontos
      </Link>
     </header>

     <form onSubmit={handleSubmit}>
       <h1>Cadastro do <br/> ponto de coleta</h1>

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
              <label htmlFor="whatsapp">Whatsapp</label>
              <input 
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handelInputChange}
                />
            </div>
         </div>
       </fieldset>

       <fieldset>
         <legend>
           <h2>Endereço</h2>
           <span>Selecione o endereço no mapa</span>
         </legend>
          
         {initialPosition[0] !== 0 && (
            <MapContainer
              center={initialPosition}
              zoom={15}
            >
              <Marker
                key={initialPosition[0]}
                position={initialPosition}
                interactive={false}
                icon={L.divIcon({ className: "custom icon", html: ReactDOMServer.renderToString(<MarkerCustom />) })}
              >

              </Marker>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
        )}

         <div className="field-group">
           <div className="field">
             <label htmlFor="uf">Estado(UF)</label>
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
             <label htmlFor="city">Cidade</label>
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
       </fieldset>

       <fieldset>
         <legend>
           <h2>Ítens de coleta</h2>
           <span>Selecione um ou mais ítems abaixo</span>
         </legend>
         <ul className="itemsGrid">
           {items.map(item => (
             <li 
              key={item.id} 
              onClick={() => handleSelectItem(item.id)} 
              className={selectedItems.includes(item.id) ? 'selected' : ''}
             >
             <img src={`http://localhost:3333/uploads/${item.imageData}`} alt={item.title}/>
           <span>{item.title}</span>
           </li>
           ))}
           
         </ul>
       </fieldset>

       <button type="submit">
        Cadastrar ponto de coleta
       </button>
     </form>
   </div>
  )
}

export default CreatePoint