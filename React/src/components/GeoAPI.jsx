import React, { useEffect, useState } from "react";
import { getProvData, totalPageProv } from "../utils/data-api";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

export default function GeoAPI() {
  const [getTotalPage, setTotalPage] = useState(null);
  const [getDataProv, setDataProv] = useState(null);
  const [getFeature, setFeature] = useState(null);

  useEffect(() => {
    totalPageProv().then((data) => {
      const d = data.data;
      const total = d.totalPage;
      setTotalPage(total);
    });

    const mixData = [];
    for (let i = 0; i < getTotalPage; i += 3) {
      const fetchData = Array(4)
        .fill(null)
        .map((_, index) => {
          console.log(index);
          getProvData(index).then((data) => data.data);
        });
      mixData.push(fetchData);
    }
    setDataProv(mixData);

    if (getDataProv !== null) {
      getDataProv.find((d) => {
        console.log(d);
        const feature = d.provFeature;
      });
    }
  }, [getTotalPage]);

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
        {getFeature !== null && <GeoJSON data={getFeature} />}
      </MapContainer>
    </div>
  );
}
