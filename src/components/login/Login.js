import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import useAuth from "../../hooks/useAuth";
import { loginService } from "../../api/auth";

function Login() {
    const { setAuthData } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    // Event handler to update formData state
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const data = await loginService(formData);
        if(data) {
            await setAuthData(data.token);
            navigate('/');
        }
    };


    return <Box className="fullHeightContent flexCenterBox">
    <Box component="form" onSubmit={handleSubmit} onChange={handleChange} className="signupForm">
        <Box component="span" className="signupIcon">
            <LockOutlinedIcon />
        </Box>
        <Typography variant="h5">
            Sign in
        </Typography>
        <TextField name="username" value={formData.username} type="email" label="Email Address" variant="outlined" margin="dense" required fullWidth />
        <TextField name="password" value={formData.password} type="password" label="Password" variant="outlined"  margin="dense" required fullWidth />
        <Button type="submit" variant="contained" fullWidth sx={{ my: 1 }}>Sign in</Button>
        <Box className="fullWidth">
            <Link component={NavLink} variant="body2" to="/signup">Don't have an account? Sign up</Link>
        </Box>
    </Box>
</Box>;
}

export default Login;