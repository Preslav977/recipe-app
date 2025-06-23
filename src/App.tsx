import './App.css'
import React from "react"; 
import Navbar from "./components/Navigation/Navbar";
 
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LoginForm from "./components/LoginForm/LoginForm";
import { Provider } from "react-redux";
import store from "./store/store";

// import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <Provider store={store}>
      <Navbar />          
      <LoginForm />
      <SignUpForm />
    </Provider>
  );
}

export default App;
