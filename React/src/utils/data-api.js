const BASE_URL = "https://brainy-rose-rugby-shirt.cyclic.app/v1";

async function totalPageProv() {
  const response = await fetch(`${BASE_URL}/get-prov-page`);
  const responseJson = await response.json();

  return { error: false, data: responseJson };
}

async function getProvData(pageNumber) {
  const response = await fetch(
    `${BASE_URL}/get-province-all?page=${pageNumber + 1}`
  );
  const responseJson = await response.json();

  return { error: false, data: responseJson };
}

export { totalPageProv, getProvData };
