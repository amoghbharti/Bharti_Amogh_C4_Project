import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import './Signup.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { signupService } from "../../api/auth";

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactNumber: '',
    });

    // Event handler to update formData state
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Event handler to update formData state
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const data = await signupService(formData);
        if(data) {
            navigate('/login');
        }
    };

    return <Box className="fullHeightContent flexCenterBox">
        <Box component="form" onSubmit={handleSubmit} onChange={handleChange} className="signupForm">
            <Box component="span" className="signupIcon">
                <LockOutlinedIcon />
            </Box>
            <Typography variant="h5">
                Sign up
            </Typography>
            <TextField name="firstName" value={formData.firstName} label="First Name" variant="outlined" margin="dense" required fullWidth />
            <TextField name="lastName" value={formData.lastName} label="Last Name" variant="outlined" margin="dense" required fullWidth />
            <TextField name="email" value={formData.email} type="email" label="Email Address" variant="outlined" margin="dense" required fullWidth />
            <TextField name="password" value={formData.password} type="password" label="Password" variant="outlined"  margin="dense" required fullWidth />
            <TextField name="confirmPassword" value={formData.confirmPassword} type="password" label="Confirm Password" variant="outlined" margin="dense" required fullWidth />
            <TextField name="contactNumber" value={formData.contactNumber} label="Contact Number" variant="outlined" margin="dense" required fullWidth />
            <Button type="submit" variant="contained" fullWidth sx={{ my: 1 }}>Sign up</Button>
            <Box className="fullWidth flexEndBox">
                <Link component={NavLink} variant="body2" to="/login">Already have an account? Sign in</Link>
            </Box>
        </Box>
    </Box>;
}

export default Signup;