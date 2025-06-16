import { useState } from "react";

// import './App.css'
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LoginForm from "./components/LoginForm/LoginForm";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <LoginForm />
      {/* <SignUpForm /> */}
    </Provider>
  );
}

export default App;
