import React, { useEffect, useState } from "react";
import { getProvData, totalPageProv } from "../utils/data-api";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

export default function GeoAPI() {
  const [getData, setData] = useState(null);

  // useEffect(() => {
  //   const totalPage = async () => {
  //     const response = await totalPageProv();
  //     const pageSize = response.data.totalPage;
  //     return pageSize;
  //   };

  //   const getDataProv = async () => {
  //     const pageSize = await totalPage();

  //     Promise.all(
  //       Array(pageSize)
  //         .fill(null)
  //         .map((_, index) => getProvData(index))
  //     );
  //   };

  //   getDataProv();
  // });

  return (
    <div>
      <MapContainer
        center={[-1.2480891, 115.419]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
