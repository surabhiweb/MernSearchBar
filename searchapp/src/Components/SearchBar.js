import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";


// function getAds(text) {

// }

//type responseDate = 

// {
//   "company_name: "
// }


function SearchBar({ placeholder }) {
  // const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [ responseData, setResponseData] = useState([]);

  const baseUrl = "http://localhost:3002/"


  React.useEffect(() => {
    if(wordEntered.length>0){
      axios.get(baseUrl + "get-ads/"+ wordEntered).then((response) => {
        // console.log(response.data.ads);
        setResponseData(response.data.ads)
        console.log(responseData)
        // console.log(JSON.parse(response));
      }).catch((err) => console.log(err))
    }
    
  }, [wordEntered])


  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    // const newFilter = responseData.filter((value) => {
    //   console.log("value->name",value.name);
    //   console.log("value->ads",value.ads);
    //   console.log("value->primaryText",value.ads.primaryText);
    //    return value.name.toLowerCase().includes(searchWord.toLowerCase())|| value.ads.primaryText.included(searchWord.toLowerCase());
    // });

  //   if (searchWord === "") {
  //     setFilteredData([]);
  //   } else {
  //     setFilteredData(newFilter);
  //   }
  };

  const clearInput = () => {
    // setFilteredData([]);
       setWordEntered("");
  };

  // console.log("filteredData->",filteredData);

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {responseData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {responseData.length !== 0 && (
        <div className="dataResult">
          {responseData.map((value, key) => {
            return (
              <a className="dataItem" href={value.url} target="_blank">
                <p>{value.name} </p>
               
                
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
