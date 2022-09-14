import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

interface Item {
  id: number
  title: string
  image_url: string
}

interface Point {
  id: number
  name: string
  image: string
  image_url: string
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


  return (
    <div className="pointsContainer">
      <h1>Hello World2</h1>

      {initialPosition[0] !== 0 && (
        <div className="map">
          <MapContainer
            center={initialPosition}
            zoom={15}
            style={{ width: '800px', height: '500px', borderRadius: '8px' }}
          >
            <Marker
              key={initialPosition[0]}
              position={initialPosition}
              interactive={false}
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
  )
}

export default Points