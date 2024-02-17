import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import "./App.css";
import CreateTree from "./functions/CreateTree";

function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<CreateTree />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
