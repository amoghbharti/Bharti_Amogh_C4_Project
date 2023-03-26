import { useState } from "react";
import Box from "@mui/material/Box";
import HorizontalLinearStepper from "../../common/stepper/Stepper";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
    const navigate = useNavigate();
    const [activeStep, ] = useState(0);
    const steps = ['Items', 'Select Address', 'Confirm'];

    return <Box>
        <HorizontalLinearStepper steps={steps} activeStep={activeStep} onFinish={() => navigate('/products')} />
    </Box>
}

export default PlaceOrder;