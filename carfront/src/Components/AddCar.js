import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

function AddCar(props){
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        year: '',
        fuel: '',
        price: ''
    });
    // 모달 폼 열기
    const handleClickOpen = () => {
        setOpen(true);
    }

    // 모달 폼 닫기
    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        props.addCar(car);
        handleClose();
    }

    return(
        <div>
            <Button variant="contained" onClick={handleClickOpen}>New Car</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New car</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="Brand" name="brand" autoFocus variant="standard" value={car.brand} onChange={handleChange} />
                        <TextField label="Model" name="model" autoFocus variant="standard" value={car.model} onChange={handleChange} />
                        <TextField label="Color" name="color" autoFocus variant="standard" value={car.color} onChange={handleChange} />
                        <TextField label="Year" name="year" autoFocus variant="standard" value={car.year} onChange={handleChange} />
                        <TextField label="Price" name="price" autoFocus variant="standard" value={car.price} onChange={handleChange} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddCar;