import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import logo from '../../assets/logo.svg'
import ReactDOMServer from 'react-dom/server'
import L from 'leaflet'
import MarkerCustom from '../../components/Marker/Marker'
import { Button } from 'antd'

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

  // const user = localStorage.getItem('user')
  // const userData = JSON.parse(`${user}`).data

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
    api.get('pontocoleta').then(response => {
      setPoints(response.data)
    })
  }, [selectedItems])


  function handleSelectItem(id: number) {
    const alredySelected = selectedItems.findIndex(item => item === id)

    if (alredySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }

  }


  const ShowMarkers = ({ markers }: any) => {
    return markers.map((point: any) => {
      return (
        <>
          <Marker
            position={
              [
                point.latitude,
                point.longitude
              ]}
            eventHandlers={{
              click: () => {
                console.log('marker clicked')
              },
            }}
            interactive={true}
            icon={L.divIcon({
              className: "custom icon", html: ReactDOMServer.renderToString(
                <>
                  <MarkerCustom
                    pointImage={point.image}
                    pointName={point.name}
                  />
                </>
              )
            })}
          />
        </>
      )
    })
  }

  return (
    <div className="pointsContainer">
      <header className="pointsHeader">
        <img src={logo} alt="Ecoleta" />
        <Link to="/createPoint" className="addPoint">
          <strong>Cadastrar Ponto</strong>
        </Link>
      </header>
      <div className="mapContainer">
        {initialPosition[0] !== 0 && initialPosition[1] !== 0 && (
          <div className="map">
            <MapContainer
              center={initialPosition}
              zoom={15}
              style={{ width: '800px', height: '450px', borderRadius: '8px' }}
            >
              <ShowMarkers markers={points} />
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
              <img src={`http://localhost:3333/uploads/${item.imageData}`} alt={item.title} />
              <span>{item.title}</span>
            </li>
          ))}

        </ul>
      </div>
    </div>
  )
}

export default Points