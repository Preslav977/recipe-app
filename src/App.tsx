// import './App.css'
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { Navigation } from "./components/Navigation/Navigation";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
        <Outlet />
        <Footer />
      </PersistGate>
    </Provider>
  );
}
export default App;
