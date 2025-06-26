// import './App.css'
import { Provider } from "react-redux";
import store from "./store/store";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navigation/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Outlet />
      <Footer />
    </Provider>
  );
}
export default App;
