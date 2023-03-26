import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuth from '../../hooks/useAuth';


function ProductCard({ product = {}, onEdit = () => { }, onDelete = () => { } }) {
    const { isAdmin } = useAuth();

    return <Card sx={{ maxWidth: 345, width: "100%" }}>
        <CardMedia
            component="img"
            height="194"
            image={product.imageUrl}
            alt="product image"
        />
        <CardContent>
            <Box className="flexSpaceBetween">
                <Typography variant="h5" color="text.secondary">
                    {product.name}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    ₹ {product.price}
                </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary">
                {product.description}
            </Typography>
        </CardContent>
        <CardActions disableSpacing classes={{ root: "flexSpaceBetween" }}>
            <Box>
                <Button variant="contained">BUY</Button>
            </Box>
            <Box>
                {isAdmin && <Box>
                    <IconButton aria-label="edit" onClick={() => onEdit(product.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => onDelete(product.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>}
            </Box>
        </CardActions>
    </Card>;
}

export default ProductCard;