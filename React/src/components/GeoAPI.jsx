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

    const getProv = async () => {
      const fetchData = await Promise.all(
        Array(getTotalPage)
          .fill(null)
          .map((_, index) => getProvData(index).then((data) => data.data))
      );

      const mixData = fetchData.flat();
      setDataProv(mixData);
    };

    if (getDataProv !== null) {
      getDataProv.find((d) => {
        const feature = d.provFeature;
        setFeature(feature);
      });
    }

    getProv();
  }, [getTotalPage, getDataProv]);

  console.log(getFeature);

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
