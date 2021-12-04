import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Test from './components/Test';
import Footer from './components/Footer';
// import { Container } from "semantic-ui-react";
import MovieForm from './components/MovieForm';
import Result from './components/Result';
// import background from './img/nexflix_background.jpeg';
import background from './img/backgroundimg.png';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Datasets from './components/Datasets';
import {Typography} from "@mui/material";
import { withStyles } from "@material-ui/core/styles";

// import CssBaseline from '@material-ui/core/CssBaseline';
// import { ThemeProvider } from '@material-ui/styles';
// import theme from './theme';
import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

const TitleTypography = withStyles({
  root: {
    color: "#1976d2"
  }
})(Typography);
 
function App() {
  const [genres, setGenres] = useState([]);
  const [poster, setPoster] = useState([]);
  // const [movies, setMovies] = useState([]); // store prediction results
  
  // useEffect(() => {
  //   fetch("/recommendGenre").then(response =>
  //     response.json().then(data => {
  //       setMovies(data);
  //     })
  //   );
  // }, []);

  return (
    // <div className="App" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover',backgroundRepeat: 'no-repeat', width: '100vw',height: '100vh' }}>
    <div className="App">  
      <Router>
        <Header />
        <br />
        <Container className="mainContainer">
          {/* <h1 style={{color : 'white'}}>The Movie Recommender</h1> */}
          {/* <h1>The Movie Recommender</h1> */}
          <TitleTypography variant="h3" gutterBottom component="div">The Movie Recommender</TitleTypography>
          <div className="content">
            <Switch>
              <Route exact path="/"> 
                <Home />
              </Route>
              <Route exact path="/datasets"> 
                <Datasets />
              </Route>
            </Switch>
          </div>
          
          {/* <Test /> */}
        </Container>
        {/* <hr /> */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
