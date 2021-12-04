import { Box, List, ListItem, Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const SubtitleTypography = withStyles({
    root: {
      color: "#1976d2",
      fontWeight: "bold"
    }
  })(Typography);

const Result = ({movies}) => {
    return (
        // <Box>
        //     {movies.length > 0 && (
        //         <SubtitleTypography variant="h5" align='left' ml={10} gutterBottom component="div">
        //             The movies recommended for you:
        //         </SubtitleTypography> 
        //     )}
        //     {/* <h1>The movies recommended for you:</h1> */}
        //     <List sx={{pl:10}}>
        //         {movies.map(movie => {
        //             // TODO check if key exist in object?
        //             // console.log(poster in movie ? "in movie" : "not");
        //             return (
        //                 <ListItem key={movie.id}>
        //                     <Typography variant="h5" component="div">Title: {movie.title}</Typography>
        //                     {"year" in movie && movie.year.length > 0(
        //                         <Typography variant="h5" component="div">Year: {movie.year}</Typography>
        //                     )}
        //                 </ListItem>
        //             );
        //         })}
        //     </List>
        // </Box>
        <TableContainer component={Paper}>
            {movies.length > 0 && (
                <SubtitleTypography variant="h5" align='left' ml={10} gutterBottom component="div">
                    The movies recommended for you:
                </SubtitleTypography> 
            )}
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="right">Year</TableCell>
                {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
            </TableHead>
            <TableBody>
            {movies.map((movie) => (
                <TableRow
                key={movie.movieId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row" align="right">
                    {movie.movieId}
                </TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell align="right">{movie.year}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    )
}

export default Result
