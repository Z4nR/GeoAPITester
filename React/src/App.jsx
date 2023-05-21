import { Fragment, useState } from "react";
import GeoAPI from "./components/GeoAPI";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Fragment>
      <GeoAPI />
    </Fragment>
  );
}

export default App;
