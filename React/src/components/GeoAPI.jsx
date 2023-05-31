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

    const loadData = async () => {
      let i = 1;
      let batchSize = 5;
      const mixData = [];
      while (i < getTotalPage) {
        let dataSize = batchSize;
        if (i + batchSize > getTotalPage) {
          dataSize = getTotalPage - i + 1;
        }

        const fetchData = async () => {
          const data = await Promise.all(
            Array(dataSize)
              .fill(null)
              .map((_, index) =>
                getProvData(i + index).then((data) => {
                  return data.data;
                })
              )
          );
          mixData.push(...data);
        };

        await fetchData();
        i += dataSize;
      }

      const mergeArray = mixData.flat();

      setDataProv(mergeArray);
    };

    loadData();
  }, [getTotalPage]);

  useEffect(() => {
    console.log(getDataProv);

    if (getDataProv !== null) {
      getDataProv.find((d) => {
        const feature = d.provFeature;
        setFeature(feature);
      });
    }
  }, [getDataProv]);

  console.log(getFeature);

  return (
    <div>
      <MapContainer center={[-1.2480891, 122]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {getFeature !== null && <GeoJSON data={getFeature} />}
      </MapContainer>
    </div>
  );
}
