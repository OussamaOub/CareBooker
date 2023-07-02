import StackNavigator from "./StackNavigator";
import React, { useEffect, useState } from "react";
import { registerRootComponent } from "expo";

const App = () => {
  return <StackNavigator />;
};
registerRootComponent(App);
export default App;
