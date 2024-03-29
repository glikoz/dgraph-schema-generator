import "./App.css";
import HomePage from "./components/HomePage";
import ListNodes from "./components/ListNodes";
import ListEdges from "./components/ListEdges";
import ThirdPage from "./components/ThirdPage";
import PreviewSchema from "./components/PreviewSchema";
import Menu from "./components/Menu";
import NavigationDrawer from "./components/NavigationDrawer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EEF2F6" }}>
      <Router>
        <div className="flex flex-col w-full h-full">
          <ToastContainer />
          <Menu />
          <div className="flex mx-auto container">
            <NavigationDrawer />
            <div className="flex w-full" style={{ backgroundColor: "#EEF2F6" }}>
              <Switch>
                <Route path="/schema" component={() => <PreviewSchema />} />
                <Route path="/thirdpage" component={() => <ThirdPage />} />
                <Route path="/listedges" component={() => <ListEdges />} />
                <Route path="/listnodes" component={() => <ListNodes />} />
                <Route path="/" component={() => <ListNodes />} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
