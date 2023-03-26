import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography";
import { getProductByIdService } from "../../api/product";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);

    const getProductById = useCallback(async () => {
        if (id) {
            const data = await getProductByIdService(id);
            if (data) setProduct(data);
            else navigate('/products');
        }
    }, [id, navigate]);

    useEffect(() => {
        if (id) {
            getProductById();
        } else {
            navigate('/products');
        }
    }, [id, navigate, getProductById]);

    const handleOrder = () => {
        navigate('/place-order', { state: { productId: id, quantity: quantity } });
    }

    return <Box sx={{ p: 8, display: 'flex' }}>
        <Box className="productImage">
            <img src={product.imageUrl || ''} width={500} height={500} alt="product" />
        </Box>
        <Box>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h4" sx={{ mr: 2 }}>{product.name}</Typography>
                <Chip color="primary" label={`Available Quantity : ${product.availableItems}`} />
            </Box>

            <Box sx={{ display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ mr: 2 }}>Category: </Typography>
                <Typography variant="subtitle1" fontWeight="bold">{product.category}</Typography>
            </Box>
            <br />
            <Typography variant="subtitle1">{product.description}</Typography>
            <br />
            <Typography variant="h5" color="error">₹ {product.price}</Typography>

            <TextField name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} label="Enter Quantity" variant="outlined" margin="normal" />
            <Box>
                <Button onClick={handleOrder} variant="contained">Place Order</Button>
            </Box>
        </Box>
    </Box>;
}

export default ProductDetail;