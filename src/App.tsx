// import './App.css'
import { Provider } from "react-redux";
import store from "./store/store";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { Navigation } from "./components/Navigation/Navigation";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Outlet />
      <Footer />
    </Provider>
  );
}
export default App;
