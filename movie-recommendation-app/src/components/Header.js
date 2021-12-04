import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { Link } from 'react-router-dom';

const Header = () => {
    const [value, setValue] = useState('/');
    // const allTabs = ['/', '/', '/datasets'];

    const handleChange = (event, value) => {
        setValue(value);
        console.log(value);
    };
    return (        
        <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
            <Tab label="DSCI 551" value="/" component={Link} to='/'/>
            <Tab label="Home" value="/home" component={Link} to='/' />
            <Tab label="Datasets" value="/datasets" component={Link} to='/datasets' />
        </Tabs>
    )
}

export default Header

// maroon # 8000 value={value} onChange={handleChange} 