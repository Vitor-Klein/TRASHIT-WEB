import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import logo from '../../assets/logo.svg'
import ReactDOMServer from 'react-dom/server'
import L from 'leaflet'
import MarkerCustom from '../../components/Marker/Marker'
import { Modal, Button } from '@mui/material';
import { Delete, AddLocationAlt, Close } from '@mui/icons-material';

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
  uf: string
  city: string
  country: string
  status: string
}

interface Params {
  uf: string
  city: string
}

function Points() {
  const [items, setItems] = useState<Item[]>([])
  const [points, setPoints] = useState<Point[]>([])
  const [point, setPoint] = useState<Point>()
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [pointDelete, setPointDelete] = useState<boolean>(false)

  const navigation = useNavigate()



  useEffect(() => {
    const user = localStorage.getItem('user')
    const userData = JSON.parse(`${user}`)

    if (!userData) {
      navigation('/signIn')
    } else {
      navigation('/pontos')

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

  useEffect(() => {
    if (selectedItems.length === 0) {
      api.get('/pontocoleta').then(response => {
        setPoints(response.data)
        statusClass(response.data);

      })
    } else {
      api.get('pontocoleta/findCa', {
        params: {
          id_category: selectedItems
        }
      }).then(response => {
        var arr = [];
        if (response.data.length === 0) {
          setPoints([]);

        } else {
          for (var i = 0; i < response.data.length; i++) {
            var a = response.data[i].tb_ponto_coletum;
            arr.push(a);
            setPoints(arr);
          }

        }
      })
    }
  }, [selectedItems, pointDelete])


  function handleSelectItem(id: number) {
    const alredySelected = selectedItems.findIndex(item => item === id)

    if (alredySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }

  }

  function setPointDetail(point: Point) {
    setPoint(point)
    setModalVisible(true)
  }

  function statusClass(point: Point) {
    console.log(point);
    for (var i = 0; i < points.length; i++) {
      if (points[i].status = 'Pendente') {

      }
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
                setPointDetail(point)
              },
            }}
            interactive={true}
            icon={L.divIcon({
              className: "custom icon", html: ReactDOMServer.renderToString(
                <>
                  <MarkerCustom
                    pointStatus={point.status}
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

  function handleDeletePoint(id: any) {
    api.delete('/pontocoleta/delete', {
      params: {
        id
      }
    })
    alert('Ponto de coleta Deletado!')
    setModalVisible(false)
    setPointDelete(!pointDelete)
  }

  return (
    <>
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

      <Modal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='modal'
      >
        <>
          <div className='modalContainer'>
            <div className='modalPointsHeader'>
              <header className="modalPointsHeader">
                <img src={logo} alt="Ecoleta" />
                <Button onClick={() => {
                  setModalVisible(false)
                }} variant="outlined" style={{ border: '2px solid red' }} color='error' startIcon={<Close />}>
                  <h4>Fechar Detalhes</h4>
                </Button>
              </header>
            </div>
            <img src={point?.image} alt="imagem do ponto" className='modalPointImage' />
            <div className="pointActions">
              <div className="pointInfo">
                <h2 className='modalTitle'>{point?.name}</h2>
                <h2 className='modalTitle'>Endereço:</h2>
                <h4 className='modalSubTitle'> {point?.city}, {point?.uf}, {point?.country}</h4>
              </div>

              <div className="pointButons">
                <Button onClick={() => {
                  handleDeletePoint(point?.id)
                }} className="pointButon" variant="contained" color='error' startIcon={<Delete />}>
                  <h4>Excluir Ponto</h4>
                </Button>
                {point?.status === 'Pendente' ? (
                  <Button className="pointButon" variant="contained" color='success' startIcon={<AddLocationAlt />}>
                    <h4>Aceitar Ponto</h4>
                  </Button>
                ) : null}
              </div>
            </div>

          </div>
        </>
      </Modal>
    </>
  )
}

export default Points