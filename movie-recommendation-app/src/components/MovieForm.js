import { useState } from "react";
import axios from 'axios';
import Result from "./Result";
import { Box, Input, TextField, MenuItem, Button, Typography } from "@mui/material";

const options = [
    { key: 'horror', text: 'Horror', value: 'horror' },
    { key: 'romance', text: 'Romance', value: 'romance' },
    { key: 'mystery', text: 'Mystery', value: 'mystery' },
    { key: 'children', text: 'Children', value: 'children' },
    { key: 'documentary', text: 'Documentary', value: 'documentary' },
    { key: 'comedy', text: 'Comedy', value: 'comedy' },
    { key: 'animation', text: 'Animation', value: 'animation' },
    { key: 'musical', text: 'Musical', value: 'musical' },
    { key: 'filmnoir', text: 'Film-Noir', value: 'filmnoir' },
    { key: 'crime', text: 'Crime', value: 'crime' },
    { key: 'thriller', text: 'Thriller', value: 'thriller' },
    { key: 'war', text: 'War', value: 'war' },
    { key: 'imax', text: 'IMAX', value: 'imax' },
    { key: 'drama', text: 'Drama', value: 'drama' },
    { key: 'scifi', text: 'Sci-Fi', value: 'scifi' },
    { key: 'western', text: 'western', value: 'western' },
    { key: 'fantasy', text: 'Fantasy', value: 'fantasy' },
    { key: 'adventure', text: 'Adventure', value: 'adventure' },
    { key: 'action', text: 'Action', value: 'action' }
]

const subtitleStyle = {
    width: "1px", /* Or zero, or something very small */
    margin: "auto",
    overflow: "visible",
};

const MovieForm = () => {
    const [genres, setGenres] = useState(['','','']);
    const [poster, setPoster] = useState([]); // image
    const [movies, setMovies] = useState([]); // prediction result
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [imgName, setImgName] = useState('');
    const [imgSize, setImgSize] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadErrMsg, setUploadErrMsg] = useState('');
    

    const handleChange = (event, value, name) => {
        console.log(event.target.value);
        console.log(event.target.name);
        // console.log(value.placeholder);
        if (event.target.name === 'Genre1') {
            const newGenres = genres.slice();
            newGenres[0] = event.target.value;
            setGenres(newGenres);
            console.log("1: "+newGenres);
        } else if (event.target.name === 'Genre2') {
            const newGenres = genres.slice();
            newGenres[1] = event.target.value;
            setGenres(newGenres);
            console.log("2: "+newGenres);
        } else {
            const newGenres = genres.slice();
            newGenres[2] = event.target.value;
            setGenres(newGenres);
            console.log("3: "+newGenres);
        }
    };

    const onImageChange = (event) => {
        setPoster(event.target.files[0]);
        setImgName(event.target.files[0].name);
        setImgSize([]);
        console.log("set poster");
        // console.log(event.target.files[0]);
        // console.log(event.target.files[0].name);
        const tmp = event.target.files[0].name;
        // console.log(imgName);// TODO image format check
        if (!tmp.match(/\.(jpg|jpeg|png)$/)){
            console.log("wrong file name");
            setUploadErrMsg("Please upload correct format image file.");
        } else {
            setUploadErrMsg("");
        }
        
    };

    const onSubmit = async (event) => {
        console.log("sendin img");
        event.preventDefault();
        if (uploadErrMsg.length <= 0) {
            const formData = new FormData();
            formData.append('poster', poster);// backend get: file=req.files.poster
            // console.log(event.target.files);
            // const imgFile = event.target.files[0];
            // const imgSize = event.target.files[0].size;
            // console.log(imgName,imgSize);
            setIsLoading(true);
            try {
                const res = await axios.post('/uploadimage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => { // then print response status
                    setPoster([]);
                    setUploadErrMsg('');
                    console.log("gettin response");
                    // console.log(event.target.files[0].name);
                    // console.log(imgSize);
                    setMessage(imgName);
                    // setIsError(false);
                    setIsLoading(false);
                    setMovies(res.data.result);
                    setImgSize(res.data.metadata);
                    // (res.data.metadata)
                });
            } catch (error) {
                console.log('image upload err');
                setUploadErrMsg("Please refresh the page.");
            }
        } 
    };

    return (
        <div>
            <Box component="form" 
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="on"
            >
                <div style={subtitleStyle}>
                    <Typography variant="subtitle1" gutterBottom component="div" ml="-400px" sx={{'width':'280px'}}>Select your favorite 3 movie genres:</Typography>
                </div>
                <div>
                    <TextField
                        id="select1"
                        select
                        name="Genre1"
                        label="Genre 1"
                        value={genres[0]}
                        onChange={handleChange}
                        helperText="Please select your favorite genres"
                        sx={{color: "white"}}
                    >
                        {options.map((option) => (
                        <MenuItem key={option.key} value={option.value}>
                            {option.text}
                        </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="select2"
                        select
                        name="Genre2"
                        label="Genre 2"
                        value={genres[1]}
                        onChange={handleChange}
                    >
                        {options.map((option) => (
                        <MenuItem key={option.key} value={option.value}>
                            {option.text}
                        </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="select3"
                        select
                        name="Genre3"
                        label="Genre 3"
                        value={genres[2]}
                        onChange={handleChange}
                    >
                        {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.text}
                        </MenuItem>
                        ))}
                    </TextField>
                </div>
                <Button variant="contained" onClick={async () => {
                        const g = { genres };
                        setIsLoading(true);
                        const response = await fetch("/genres", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(g)
                        }).then(response =>
                            response.json().then(data => {
                                setGenres(['','','']);
                                console.log(data['result'])
                                setMovies(data['result']);
                                setIsLoading(false);
                            })

                        );
                    }}>Submit</Button>
                <br />
                <br />
                <div style={subtitleStyle}>
                    <Typography variant="subtitle1" gutterBottom component="div" ml="-410px" sx={{'width':'350px'}}>
                        Or upload a poster of your favorite movie:
                    </Typography>
                </div>
                <br />
                {/* <div style={subtitleStyle}> */}
                <div>
                    {/* <div style={{ marginLeft : -410, width : 350 }}> */}

                    
                    <label htmlFor="btn-upload">
                        <input
                            id="btn-upload"
                            name="btn-upload"
                            style={{ display: 'none' }}
                            type="file"
                            onChange={onImageChange} />
                        <Button
                            style={{marginBottom: 20}}
                            className="btn-choose"
                            variant="outlined"
                            component="span" >
                            Choose Files
                        </Button>
                    </label>
                    <br />
                    {uploadErrMsg.length <= 0 && imgName.length > 0 && message.length <=0 && (
                        <Typography variant="subtitle2" className={`select-msg`} style={{marginBottom: 20}}>
                            Selected file {imgName}
                        </Typography>
                    )}
                    {uploadErrMsg.length > 0 && (
                        <Typography variant="subtitle2" className={`upload-msg ${isError ? "error" : ""}`} style={{marginBottom: 20}}>
                            {uploadErrMsg}
                        </Typography>
                    )}
                    {uploadErrMsg.length <= 0 && message.length > 0 && (
                        <Typography variant="subtitle2" className={`upload-msg ${isError ? "error" : ""}`} style={{marginBottom: 20}}>
                            Uploaded the file successfully: {message}, image width: {imgSize[0]} pixel,image height: {imgSize[1]} pixel
                        </Typography>
                    )}
                    <Button variant="contained" pl={10} onClick={onSubmit}>Upload</Button>
                    {/* </div> */}
                </div>
            </Box>
            {isLoading && (
                <Typography variant="subtitle2">
                    Fetching prediction results now
                </Typography>
            )}
            <Result movies = {movies}/>
        </div>
    )
}

export default MovieForm
