import { useEffect, useState } from "react";
import { SERVER_URL } from "../constants";
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from "@mui/x-data-grid";
import { Snackbar, Stack, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const columns = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "_links.car.href", 
      headerName: "",
      sortable: false,
      filterable: false, 
      renderCell: (row) => 
      <EditCar data={row} updateCar={updateCar}></EditCar>
    },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (row) => (
        <IconButton onClick={() => onDelClick(row.id)}>
          <DeleteIcon color="error" />
        </IconButton>
      )
    }
  ];

  const fetchCars = () => {
    // 세션 저장소에서 토큰을 읽고
    // Authorization 헤더에 이를 포함한다. 
    const token = sessionStorage.getItem("jwt");

    fetch(SERVER_URL + "api/cars", {
      headers: { 'Authorization': token }
    })
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.error(err));
  };

  const onDelClick = (url) => {
    if (window.confirm("Are you sure to delete?")) {
      const token = sessionStorage.getItem("jwt");

      fetch(url, { 
        method: "DELETE",
        headers: { 'Authorization': token }
      })
        .then((response) => {
          if (response.ok) {
            fetchCars();
            setOpen(true);
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const addCar = (car) => {
    const token = sessionStorage.getItem("jwt");

    fetch(SERVER_URL + "api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "Authorization": token },
      body: JSON.stringify(car),
    })
      .then((response) => {
        if (response.ok) {
          fetchCars();
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((err) => console.error(err));
  };

  // 자동차 업데이트
  const updateCar = (car, link) => {
    const token = sessionStorage.getItem("jwt");

    fetch(link, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
    'Authorization': token },
      body: JSON.stringify(car)
    })
    .then(response => {
      if(response.ok){
        fetchCars();
      }
      else{
        alert('Something went wrong!');
      }
    })
    .catch(err => console.error(err))
  }

  return (
    <>
      <Stack mt={2} mb={2}>
        <AddCar addCar={addCar} />
      </Stack>
      <div style={{ height: 500, width: "100%" }}>
        <div style={{ width: '1200px', margin: 'auto'}}>
        <DataGrid
          rows={cars}
          columns={columns}
          getRowId={(row) => row._links.self.href}
          disableSelectionOnClick={true}
          components={{ Toolbar: CustomToolbar}}
        ></DataGrid>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car deleted"
        />

        </div>

      </div>
    </>
  );
}

function CustomToolbar(){
  return(
    <GridToolbarContainer
    className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default Carlist;
