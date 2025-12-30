import { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./Context/notes/Notestate";
import YourNotes from "./Components/YourNotes";
import Login from "./Components/Login";
import Signin from "./Components/Signin";
import Alert from "./Components/Alert";
import Hero from "./Components/Hero";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <div className="App">
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Hero showAlert={showAlert} />} />
              <Route path="/home" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/yourNotes" element={<YourNotes showAlert={showAlert} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/SignUp" element={<Signin showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
