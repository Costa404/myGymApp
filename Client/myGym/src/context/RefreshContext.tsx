import { useState, createContext } from "react";
import YourApp from "../App";

export const AppContext = createContext({
  forceRefresh: () => {},
});

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const forceRefresh = () => setRefreshKey((prevKey) => prevKey + 1);

  return (
    <AppContext.Provider value={{ forceRefresh }}>
      <YourApp key={refreshKey} />
    </AppContext.Provider>
  );
};

export default App;
