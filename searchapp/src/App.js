import React from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import Data from "./AddData.json";

function App() {
  return (
    <div className="App">
      <SearchBar placeholder="Search Here..." data={Data} />
    </div>
  );
}

export default App;