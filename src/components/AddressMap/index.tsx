import s from "./AddressMap.module.scss";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import type { Coordinates } from "../../service/geocodingService";

import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface AddressMapProps {
  latitude: number | null;
  longitude: number | null;
  focus?: Coordinates | null;
  onLocationSelect: (
    latitude: number,
    longitude: number
  ) => void;
  disabled?: boolean;
}

const defaultPosition: L.LatLngTuple = [
  -23.5505,
  -46.6333,
];

const locationIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});

function LocationSelector({
  onLocationSelect,
  disabled,
}: Pick<
  AddressMapProps,
  "onLocationSelect" | "disabled"
>) {
  useMapEvents({
    click(event) {
      if (disabled) return;

      const { lat, lng } = event.latlng.wrap();

      onLocationSelect(lat, lng);
    },
  });

  return null;
}

function MapFocus({ focus }: {
  focus?: Coordinates | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!focus) return;

    map.setView(
      [focus.latitude, focus.longitude],
      17
    );
  }, [map, focus]);

  return null;
}

export function AddressMap({
  latitude,
  longitude,
  focus,
  onLocationSelect,
  disabled = false,
}: AddressMapProps) {
  const selectedPosition: L.LatLngTuple | null =
    latitude != null && longitude != null
      ? [latitude, longitude]
      : null;

  return (
    <div className={s.mapWrapper}>
      <h3>Localização do endereço</h3>

      <p>
        Clique no mapa para marcar a localização.
      </p>

      <MapContainer
        center={selectedPosition ?? defaultPosition}
        zoom={selectedPosition ? 17 : 12}
        scrollWheelZoom={false}
        className={s.map}
      >
        <MapFocus focus={focus} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationSelector
          onLocationSelect={onLocationSelect}
          disabled={disabled}
        />

        {selectedPosition && (
          <Marker
            position={selectedPosition}
            icon={locationIcon}
          />
        )}
      </MapContainer>

      {selectedPosition ? (
        <div className={s.coordinates}>
          <span>
            Latitude: {latitude?.toFixed(7)}
          </span>

          <span>
            Longitude: {longitude?.toFixed(7)}
          </span>
        </div>
      ) : (
        <p className={s.hint}>
          Nenhuma localização selecionada.
        </p>
      )}
    </div>
  );
}
