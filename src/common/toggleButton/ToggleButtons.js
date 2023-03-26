import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtons({ list = [], value = "", onChange = () => { } }) {
    const alignment = value;

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={onChange}
            aria-label="Platform"
        >
            {list.map((tab) => <ToggleButton key={tab.value} value={tab.value}>{tab.label}</ToggleButton>)}
        </ToggleButtonGroup>
    );
}