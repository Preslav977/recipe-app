// import './App.css'
import SignUpForm from "./components/SignUpForm/SignUpFormDesign";
import LoginForm from "./components/LoginForm/LoginFormDesign";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <LoginForm />
      <SignUpForm />
    </Provider>
  );
}

export default App;
