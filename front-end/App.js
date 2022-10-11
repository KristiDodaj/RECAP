import React, { useState } from "react";
import Main from "./screen/Main";
import SplashScreen from "./screen/SplashScreen";

function App(props) {
  const [isLoad, setLoad] = useState(false);

  setTimeout(() => {
    setLoad(true);
  }, 10000);

  return isLoad ? <Main /> : <SplashScreen />;
}
export default App;
