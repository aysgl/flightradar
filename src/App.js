import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import 'leaflet/dist/leaflet.css';
import 'leaflet-rotatedmarker';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFlights } from './redux/flightAction';
import L from 'leaflet';
import Modal from './components/Modal';

function App() {
  const state = useSelector(store => store.flight);
  const [show, setShow] = useState(false)
  const [id, setId] = useState(null)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFlights());
  }, [id, dispatch]);

  const openModal = (id) => {
    setId(id)
    setShow(true)
  }

  const closeModal = () => {
    setId(null)
    setShow(false)
  }

  const data = state.details?.trail?.map((i) => [i?.lat, i?.lng])

  return (
    <div className=''>
      {show && <Modal id={id} closeModal={closeModal} />}
      <MapContainer center={[39.237168, 31.992827]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {state.flights.map((flight, index) => {
          const rotationDegree = flight.rotation || 0;
          const planeIcon = L.icon({
            iconUrl: '/plane.svg',
            iconSize: [25, 25],
            iconAnchor: [15, 15],
          });

          return (
            <div key={index}>
              <Marker
                icon={planeIcon}
                position={[flight.lat, flight.lng]}
                rotationAngle={rotationDegree}
                rotationOrigin='center center'
                eventHandlers={{
                  click: () => openModal(flight.id),
                }}
              >
                <Popup>
                  <p>Kod: {flight.code}</p>
                </Popup>
              </Marker>
              {Array.isArray(data) && data.length > 0 && (
                <Polyline positions={data} color="#A1A2BA" dashArray="10 6" />
              )}
            </div>
          );
        })}
      </MapContainer >
    </div >
  );
}

export default App;
