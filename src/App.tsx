import React from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import EditFile from "./components/EditFile";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FileUpload />} />
          <Route path="edit/:id" element={<EditFile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
