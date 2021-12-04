import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Datasets from './components/Datasets';
import {Typography} from "@mui/material";
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';

const TitleTypography = withStyles({
  root: {
    color: "#1976d2"
  }
})(Typography);
 
function App() {
  return (
    <div className="App">  
      <Router>
        <Header />
        <br />
        <Container className="mainContainer">
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
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
