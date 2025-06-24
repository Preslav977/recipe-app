// import './App.css'
import { Provider } from "react-redux";
import store from "./store/store";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function App() {
  const Navigate = useNavigate();
  return (
    <Provider store={store}>
      <Outlet />
      <Footer />
    </Provider>
  );
}
export default App;
