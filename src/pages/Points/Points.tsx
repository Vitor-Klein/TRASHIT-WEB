import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import logo from '../../assets/logo.svg'
import ReactDOMServer from 'react-dom/server'
import L from 'leaflet'

import MarkerCustom from '../../components/Marker/Marker'

import './styles.css'

interface Item {
  id: number
  title: string
  imageData: string
}

interface Point {
  id: number
  name: string
  image: string
  imageData: string
  latitude: number
  longitude: number
}

interface Params {
  uf: string
  city: string
}

function Points() {
  const [items, setItems] = useState<Item[]>([])
  const [points, setPoints] = useState<Point[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

  const navigation = useNavigate()

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

  function handleSelectItem(id: number) {
    const alredySelected = selectedItems.findIndex(item => item === id)

    if(alredySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }

  }


  return (
    <div className="pointsContainer">
      <header>
        <img src={logo} alt="Ecoleta" />
      </header>
      <div className="mapContainer">
        {initialPosition[0] !== 0 && (
          <div className="map">
            <MapContainer
              center={initialPosition}
              zoom={15}
              style={{ width: '800px', height: '450px', borderRadius: '8px' }}
            >
              <Marker
                key={initialPosition[0]}
                position={initialPosition}
                interactive={false}
                icon={L.divIcon({ className: "custom icon", html: ReactDOMServer.renderToString( <MarkerCustom/> ) })}
              >

              </Marker>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </div>
        )}
      </div>

      <div className="containerCategorias">
      <ul className="items-grid">
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
      </div>
    </div>
  )
}

export default Points