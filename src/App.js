import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      url: "https://intern-pokedex.myriadapps.com/api/v1/pokemon",
      pokemon: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
  }

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data["data"] });
    console.log(this.state.pokemon);
  }

  handleChange(e) {
    this.setState({
      search: e.target.value,
    });
  }

  filterSearch() {
    return this.state.search === ""
      ? this.state.pokemon
      : this.state.pokemon.filter((p) =>
          p.name.toLowerCase().includes(this.state.search)
        );
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar
            changeProp={this.handleChange}
            searchVal={this.state.search}
          />

          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Dashboard fSearch={this.filterSearch()} />}
              />
              <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

