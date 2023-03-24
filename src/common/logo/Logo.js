import { NavLink } from 'react-router-dom';
import './Logo.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

function Logo() {
    return <Box id="appLogo" component={NavLink} to="/">
        <ShoppingCart sx={{ px: 1 }} />
        <Typography variant='h6' noWrap>
            upGrad E-Shop
        </Typography>
    </Box>
}

export default Logo;