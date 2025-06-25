
import './App.css'
import React from "react"; 
import Navbar from "./components/Navigation/Navbar";
 
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LoginForm from "./components/LoginForm/LoginForm";
import { Provider } from "react-redux";
import store from "./store/store";
import FullScreenLoader from './components/Loader/FullScreenLoader';

// import { BrowserRouter as Router } from "react-router-dom";

// import './App.css'
import { Provider } from "react-redux";
import store from "./store/store";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function App() {
  const Navigate = useNavigate();
  return (
    <Provider store={store}>
      <Navbar />         
      <Outlet />
      <Footer />
    </Provider>
    
  );
}
export default App;
