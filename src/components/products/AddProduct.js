import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Creatable from 'react-select/creatable';
import { addProductService, getCategoriesService, getProductByIdService, updateProductService } from "../../api/product";

function AddProduct({ modify = false }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        manufacturer: '',
        availableItems: '',
        price: '',
        imageUrl: '',
        description: '',
    });
    const [categories, setCategories] = useState([]);
    const options = useMemo(() => categories.map((categories) => ({ label: categories, value: categories })), [categories]);

    const handleSelect = (val) => {
        setFormData((prevData) => ({ ...prevData, category: val ? val.value : '' }));
    }

    const getCategories = async () => {
        const data = await getCategoriesService();
        if (data) {
            setCategories(data);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    const getProductById = useCallback(async () => {
        if(id) {
            const data = await getProductByIdService(id);
            if(data) {
                setFormData(data);
            } else {
                navigate('/products');
            }
        }
    }, [id, navigate])

    useEffect(() => {
        if(modify) {
            getProductById();
        }
    }, [modify, getProductById]);

    // Event handler to update formData state
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const data = await (modify ? updateProductService(id, formData) : addProductService(formData));
        if (data) {
            navigate('/products');
        }
    };

    return <Box className="fullHeightContent flexCenterBox">
        <Box component="form" onSubmit={handleSubmit} onChange={handleChange} className="signupForm">
            <Typography variant="h5">
                {modify ? 'Modify Product' : 'Add Product'}
            </Typography>
            <TextField name="name" value={formData.name} label="Name" variant="outlined" margin="dense" required fullWidth />
            <Creatable options={options} onChange={handleSelect} className="fullWidth" placeholder="Category" required
                value={formData.category ? { value: formData.category, label: formData.category } : null}
                styles={{
                    // Fixes the overlapping problem of the component
                    menu: provided => ({ ...provided, zIndex: 2 })
                }} />
            <TextField name="manufacturer" value={formData.manufacturer} label="Manufacturer" variant="outlined" margin="dense" required fullWidth />
            <TextField name="availableItems" value={formData.availableItems} label="Available Items" variant="outlined" margin="dense" required fullWidth />
            <TextField name="price" value={formData.price} label="Product Price" variant="outlined" margin="dense" required fullWidth />
            <TextField name="imageUrl" value={formData.imageUrl} label="Image URL" variant="outlined" margin="dense" required fullWidth />
            <TextField name="description" value={formData.description} label="Product Description" variant="outlined" margin="dense" required fullWidth />
            <Button type="submit" variant="contained" fullWidth sx={{ my: 1 }}>{modify ? 'MODIFY PRODUCT' : 'SAVE PRODUCT'}</Button>
        </Box>
    </Box>;
}

export default AddProduct;