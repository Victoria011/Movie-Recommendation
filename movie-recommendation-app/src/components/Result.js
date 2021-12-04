import { Box, List, ListItem, Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";

const SubtitleTypography = withStyles({
    root: {
      color: "#1976d2",
      fontWeight: "bold"
    }
  })(Typography);

const Result = ({movies}) => {
    return (
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
