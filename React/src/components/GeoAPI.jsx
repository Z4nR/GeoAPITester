import React, { useEffect, useState } from "react";
import { getProvData, totalPageProv } from "../utils/data-api";

export default function GeoAPI() {
  const [getData, setData] = useState(null);

  useEffect(() => {
    const totalPage = async () => {
      const response = await totalPageProv();
      const pageSize = response.data.totalPage;
      return pageSize;
    };

    const getDataProv = async () => {
      const pageSize = await totalPage();

      Promise.all(
        Array(pageSize)
          .fill(null)
          .map((_, index) => getProvData(index))
      );
    };

    getDataProv();
  });

  return (
    <div>
      <p>P</p>
    </div>
  );
}
