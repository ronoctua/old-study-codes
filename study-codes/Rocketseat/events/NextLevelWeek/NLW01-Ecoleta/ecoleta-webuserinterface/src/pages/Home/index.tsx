import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Icon as LeafletIcon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import axios from 'axios';

import { FaHome, FaRegTimesCircle } from 'react-icons/fa';
import RecycleIcon from '../../assets/recycle-icon.svg';
import RecycleSVG from '../../assets/recycle-marker.svg';

import api from '../../services/api';

import './styles.css';

interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface PointData {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Home = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [pointToShow, setPointToShow] = useState<PointData>({} as PointData);

  const sidebarElement = document.querySelector('#sidebar') as Element;

  const recycleIcon = new LeafletIcon({
    iconUrl: RecycleSVG,
    iconSize: [27, 35],
    iconAnchor: [8, 38],
  });

  useEffect(() => {
    api.get('allpoints').then((response) => {
      setPoints(response.data);
    });
  }, []);

  function handleMarkerClick(pointID: number) {
    api.get(`points/${pointID}`).then((pointData) => {
      setPointToShow(pointData.data);

      if (sidebarElement.classList.contains('hide')) {
        sidebarElement.classList.remove('hide');
        sidebarElement.className = 'flex';
      }
    });
  }

  function handleCloseSidebar() {
    sidebarElement.classList.remove('flex');
    sidebarElement.className = 'hide';
  }

  return (
    <>
      <div className="top">
        {/* <img src={RecycleIcon} alt="Recycle_Icon" /> */}
        <div className="flex1">
          <div className="recycle-icon-box spin">
            <h1>&#9851;</h1>
          </div>
          <h1>Ecoleta</h1>
        </div>
        <div>
          <button className="button-style">
            <FaHome size={18} />
          </button>
          <button className="button-style">Cadastrar Ponto</button>
        </div>
      </div>

      <Map className="map" center={[0, 0]} zoom={3}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <div id="sidebar" className="hide">
          <div className="top-of-sidebar">
            <button
              onClick={() => {
                handleCloseSidebar();
              }}>
              <strong>
                <FaRegTimesCircle />
              </strong>
            </button>
          </div>
          <div className="sidebar-content">
            <img src={pointToShow.point?.image_url} />
            <h2>{pointToShow.point?.name}</h2>
            <i>
              {pointToShow.point?.city} - {pointToShow.point?.uf}
            </i>
            <p>
              Coleta:{' '}
              {pointToShow.items &&
                pointToShow.items.map((item) => item.title).join(', ')}
              .
            </p>
            <div>
              <a
                href={
                  'mailto:' +
                  pointToShow.point?.email +
                  '?subject=Interesse na coleta de residuos.'
                }
                target="_blank"
                className="button-style">
                E-mail
              </a>
              <a
                href={
                  'https://web.whatsapp.com/send?phone=' +
                  pointToShow.point?.whatsapp +
                  '&text=Olá! Tenho interesse sobre a coleta de resíduos.'
                }
                target="_blank"
                className="button-style">
                Whatsapp
              </a>
            </div>
          </div>
        </div>

        <MarkerClusterGroup>
          {points.map((point) => (
            <Marker
              key={String(point.id)}
              position={{
                lat: point.latitude,
                lng: point.longitude,
              }}
              icon={recycleIcon}
              onclick={() => handleMarkerClick(point.id)}></Marker>
          ))}
        </MarkerClusterGroup>
      </Map>
    </>
  );
};

export default Home;
