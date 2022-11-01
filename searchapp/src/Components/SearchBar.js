import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "companyId", headerName: "Id", width: 50 },
  { field: "primaryText", headerName: "primaryText", width: 200 },
  { field: "headline", headerName: "headline", width: 200 },
  { field: "description", headerName: "description", width: 200 },
  { field: "CTA", headerName: "CTA", width: 100 },
  { field: "imageUrl", headerName: "imageUrl", width: 230 },
];

function SearchBar({ placeholder }) {
  // const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [responseData, setResponseData] = useState([]);

  const baseUrl = "http://localhost:3002/";

  React.useEffect(() => {
    if (wordEntered.length > 0) {
      axios
        .get(baseUrl + "get-ads/" + wordEntered)
        .then((response) => {
          // console.log(response.data.ads);
          setResponseData(response.data.ads);
          console.log(responseData);
          // console.log(JSON.parse(response));
        })
        .catch((err) => console.log(err));
    }
  }, [wordEntered]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
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
          {/* {responseData.map((value, key) => { */}
          {/* return ( */}
          {/* //  <a className="dataItem" href={value.url} target="_blank">
              //    <p>{value.name} </p>
              //  </a> */}

          <div
            className="dataItem"
            style={{ height: 700, width: "100%", textAlign: "center" }}
          >
            <DataGrid
              rows={responseData}
              columns={columns}
              getRowId={(row) => row._id}
              rowsPerPageOptions={[]}
              _id="_id"
            />
          </div>

          {/* ); */}
          {/* } */}
          {/* ) */}
          {/* } */}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
