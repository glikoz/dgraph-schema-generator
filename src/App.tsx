import './App.css';
import HomePage from './components/HomePage';
import SecondPage from './components/SecondPage';
import ThirdPage from './components/ThirdPage';
import Menu from "./components/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App container mx-auto  fluid h-screen">
      <Router>
        <div className="flex flex-col w-full h-full">
          <Menu />
          <Switch>
            <Route
              path="/thirdpage"
              component={() => (
                <ThirdPage />
              )}
            />
            <Route
              path="/secondpage"
              component={() => (
                <SecondPage />
              )}
            />
            <Route
              path="/thirdpage"
              component={() => (
                <SecondPage />
              )}
            />
            <Route
              path="/"
              component={() => (
                <HomePage/>
              )}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
