import { useState } from 'react';
import axios from 'axios';
import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import Metadata from './Metadata';

const Datasets = () => {
    const [jsonfile, setJSON] = useState({});
    const [filename, setFilename] = useState('');
    const [fileMeta, setFileMeta] = useState({}); // update file metadata
    const [totalMeta, setTotalMeta] = useState([{"id":1, "name":"movie_genre", "rowCount":40108, "fileSize":19135490, "attribCount":6, "features":['imdbId', 'Imdb Link', 'Title', 'IMDB Score', 'Genre', 'Poster']},
    {"id":2, "name":"title_id", "rowCount":40108, "fileSize":1332136, "attribCount":1, "features":['title']},
    {"id":3, "name":"raings", "rowCount":20000, "fileSize":1297742, "attribCount":2, "features":["userId", "movie_lst"]},
       {"id":4, "name":"movies", "rowCount":62423, "fileSize":5040306, "attribCount":3, "features":["movieId", "title", "genres"]}]);

    const [selectedDataset, setSelectedDataset] = useState({}); // TODO initial show all ds?
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [fileSize, setFileSize] = useState(0);
    const [alertMsg, setAlertMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [newFileSelected, setNewFileSelected] = useState(false);
    

    const onFileChange = (event) => {
        if (typeof event.target.files[0] !== 'undefined') {
            setNewFileSelected(true);
            setIsLoading(false);
            setJSON(event.target.files[0]);
            setFilename(event.target.files[0].name);
            setFileSize(event.target.files[0].size);
            const extension = event.target.files[0].name.split('.').pop();
            if (extension != "json") {
                setIsError(true);
                setAlertMsg("Wrong file type.");
            } else {
                setIsError(false);
                setAlertMsg("");
            }
        }   
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setNewFileSelected(false);
        if (isError || alertMsg.length > 0) {
            setAlertMsg("Wrong file type.");
            setMessage("");
        } else {
            setAlertMsg("");
            const formData = new FormData();
            formData.append('file', jsonfile); // backend get: file=req.files.file
            try {
                const res = await axios.post('/uploadfile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => { // then print response status
                    setJSON({});
                    setFileMeta(res.data.file);
                    setTotalMeta(res.data.total);
                    setMessage(filename);
                    setIsLoading(false);
                });
            } catch (error) {
                console.log('err');//error.response.status
            }
        }
    };

    return (
        <div>
            <Typography variant="subtitle1" mb={2} gutterBottom component="div">
                Upload your json dataset:
            </Typography>
            <Box>
                <label htmlFor="btn-upload">
                    <input
                        id="btn-upload"
                        name="btn-upload"
                        style={{ display: 'none' }}
                        type="file"
                        onChange={onFileChange} />
                    <Button
                        style={{marginBottom: 20}}
                        className="btn-choose"
                        variant="outlined"
                        component="span" >
                        Choose Files
                    </Button>
                </label>
                <br />
                {newFileSelected && filename.length > 0 && (!isError) && (!isLoading) && (
                    <Typography variant="subtitle2" className="select-msg" style={{marginBottom: 20}}>
                        Selected file {filename}
                    </Typography>
                )}
                {isLoading && (
                    <Typography variant="subtitle2" className="upload-msg-success" style={{marginBottom: 20}}>
                        Uploading file now. Please wait.
                    </Typography>
                )}
                {(!newFileSelected) && message.length > 0 && (!isError) && (!isLoading) && (
                    <Typography variant="subtitle2" className="upload-msg-success" style={{marginBottom: 20}}>
                        Uploaded the file successfully: {message}
                    </Typography>
                )}
                {alertMsg.length > 0 && (isError) && (!isLoading) && (
                    <Typography variant="subtitle2" className="upload-msg-wrong" style={{marginBottom: 20}}>
                        Wrong file type: {filename}
                    </Typography>
                )}
                <Button variant="contained" pl={10} onClick={onSubmit}>Upload</Button>
            </Box>
            <br />
            <hr />
            <Metadata metadata = {totalMeta}/>
            
        </div>
    )
}

export default Datasets
