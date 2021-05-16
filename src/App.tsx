import "./App.css";
import HomePage from "./components/HomePage";
import SecondPage from "./components/SecondPage";
import ThirdPage from "./components/ThirdPage";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App  fluid h-screen">
      <Router>
        <div className="flex flex-col w-full h-full">
          <ToastContainer />

          <Menu />
          <Switch>
            <Route path="/thirdpage" component={() => <ThirdPage />} />
            <Route path="/secondpage" component={() => <SecondPage />} />
            <Route path="/thirdpage" component={() => <SecondPage />} />
            <Route path="/" component={() => <HomePage />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
