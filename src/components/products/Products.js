import { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ProductCard from "../../common/product/ProductCard";
import ToggleButtons from "../../common/toggleButton/ToggleButtons";
import { getCategoriesService, getProductsService, deleteProductService } from "../../api/product";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";

function Products() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [sortBy, setSoryBy] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    const toggleList = useMemo(() => ([
        { label: "All", value: "" },
        ...categories.map((category) => ({ label: category, value: category }))
    ]), [categories]);

    const getCategories = async () => {
        const data = await getCategoriesService();
        setCategories(data);
    }

    const getAllProducts = async () => {
        const data = await getProductsService();
        setProducts(data);
    }

    useEffect(() => {
        getCategories();
        getAllProducts();
    }, []);

    const sortOptions = [
        { label: 'Default', value: '' },
        { label: 'Price: High to Low', value: 'asc' },
        { label: 'Price: Low to High', value: 'desc' },
        { label: 'Newest', value: 'latest' },
    ];

    const handleSelect = (val) => {
        setSoryBy(val?.value || null);
    }

    const comparefn = useCallback((a, b) => {
        if(!sortBy) return 0;
        if(sortBy === 'asc') {
            return b.price-a.price;
        }
        if(sortBy === 'desc') {
            return a.price-b.price;
        }
        return a.dateCreated - b.dateCreated; 
    }, [sortBy]);

    const productList = useMemo(() => {
        const list = activeCategory ? products.filter((product) => product.category === activeCategory) : products;
        return list.slice().sort(comparefn);
    }, [products, activeCategory, comparefn]);

    const handleEdit = (id) => {
        navigate(`/modify-product/${id}`);
    }

    const handleDelete = (id) => {
        setDeleteId(id);
    }

    const handleClose = () => {
        setDeleteId(null);
    }

    const deleteAction = async () => {
        await deleteProductService(deleteId);
        handleClose();
        getAllProducts();
    }

    return <Box>
        <Box sx={{ my: 2 }} className="flexCenterBox">
            <ToggleButtons list={toggleList} value={activeCategory} onChange={(e, newValue) => setActiveCategory(newValue)} />
        </Box>
        <Box sx={{ my: 2, pl: '5%' }}>
            <ReactSelect options={sortOptions} onChange={handleSelect} className="selectWidth" />
        </Box>

        <Grid container spacing={3} sx={{ px: 2 }}>
            {productList.map((product) => (
                <Grid key={product.id} item md={4} sm={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ProductCard product={product} onEdit={handleEdit} onDelete={handleDelete} />
                </Grid>
            ))}
        </Grid>

        <Dialog
        open={!!deleteId}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm deletion of product!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={deleteAction}>ok</Button>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>;
}

export default Products;