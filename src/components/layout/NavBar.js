import { Toolbar, TextField } from 'material-ui-core';
import React, { Component } from 'react';
import styled from 'styled-components';
import Pokemon from '../pokemon/Pokemon';
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles"
import axios from 'axios';


const useStyles = makeStyles( theme => ({
  searchContainer: 
  {display: 'flex',
  backgroundColor: fade(theme.palette.common.white, 0.15),
  paddingLeft: "20px",
  paddingRight: "20px",
  marginTop: "5px",
  marginBottom: "5px",
},
searchIcon: {
  alignSelf: "flex-end",
  marginBottom: "5px",
},
searchInput: {
  width: "200px",
  margin: "5px",
},
}))


const Branding = styled.a`
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;



export default class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      hoverNavBar: false,
      search: "",
      pokemon: []
    };
    this.handleChange = this.handleChange.bind(this);
  }



  hoverNavBar() {
    window.scrollY <= 0
      ? this.setState({ hoverNavBar: false })
      : this.setState({ hoverNavBar: true });
  }

  componentDidMount() {
    // Added True To End To Listen to All Events On Page
    window.addEventListener('scroll', this.hoverNavBar.bind(this), true);
    let arr = [];
    (async function(){

      const res = await axios.get("https://intern-pokedex.myriadapps.com/api/v1/pokemon")
      console.log(res.data.data)
      arr = res.data.data.map((i) =>i.name)

    })()
    
    this.setState({
      pokemon: arr
    })
  }

  componentWillUnmount() {
    // Added True To End To LIsten to All Events On Page
    window.removeEventListener('scroll', this.hoverNavBar.bind(this), true);
  }
  handleChange(event) {
    this.setState({search:event.target.value});

    
  }


  render() {
    return (
      <nav
        
        className="navbar navbar-expand-md navbar-dark bg-dark fixed-top"
        style={
          this.state.hoverNavBar
            ? {
                boxShadow:
                  '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                backgroundColor: '#ef5350 !important'
              }
            : { backgroundColor: 'transparent !important' }
        }
      >
        <Branding
          href="#"
          className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
        >
          <div>
        
          Pokedex

          
          </div>

        </Branding>
        <form>
          <input value={this.state.value} onChange={this.handleChange}/>

        </form>
       

        
      </nav>
    );
  }
  
  
}