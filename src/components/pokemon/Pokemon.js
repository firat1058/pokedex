import React, { Component } from 'react'
import axios from 'axios';

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
  };



export default class Pokemon extends Component {


    state = {
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        description: '',
        stats: {
            hp: "",
            attack: "",
            speed: "",
            specialAttack: "",
            specialDefence: "",

        },
        height: "",
        weight: "",
        egg_groups: "",
        abilities: "",
        genderRatioMale: "",
        genderRatioFemale: "",
        EVs: "",
        hatchSteps: ""


    };

    async componentDidMount() {
        const { pokemonIndex } = this.props.match.params;

        //Url for pokemon information
        const pokemonUrl = `https://intern-pokedex.myriadapps.com/api/v1/pokemon/${pokemonIndex}`;
        const pokemonSpeciesUrl = `https://intern-pokedex.myriadapps.com/api/v1/pokemon/${pokemonIndex}`;
        
        // Get Pokemon Information
        const pokemonRes = await axios.get(pokemonUrl);
        const name = pokemonRes.data.data.name;
        const imageUrl = pokemonRes.data.data.image;

        let {hp, attack, defense, speed, specialAttack, specialDefense } = '';
        console.log(pokemonRes.data.data.stats)
        var stats = pokemonRes.data.data.stats;
        hp = stats['hp']
        attack = stats['attack']
        defense = stats['defense']
        speed = stats['speed']
        specialAttack = stats['specialAttack']
        specialDefense = stats['specialDefense']

       
        const height = pokemonRes.data.data.height;
        const weight = pokemonRes.data.data.weight;

        const types = pokemonRes.data.data.types.map( type => type);

        const themeColor = `${TYPE_COLORS[types[types.lenght - 1]]}`;



        const abilities = pokemonRes.data.data.abilities.map(ability => {
            return ability.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');

        });

        const evs = Array.from(pokemonRes.data.data.stats).filter(stat => {
            if (stat.effort > 0){
                return true;
            }
            return false;
        }).map(stat => {
            return `${stat.effort} ${stat.stat.name}`.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        })
        .join(', ');

        const description = pokemonRes.data.data.description;

        this.setState({
            description
        
          });


        this.setState({
           imageUrl,
           pokemonIndex,
           name,
           types,
           stats: {
               hp,
               attack,
               defense,
               speed


           },
           height,
           weight,
           abilities,
           evs

       });

    }

    render() {
        return (
          <div className="col">
            <div className="card">
              <div className="card-header">
              
                <div className="row">
                  <div className="col-5">
                      
                    <h5>{this.state.pokemonIndex}</h5>
                  </div>
                  <div className="col-7">
                    <div className="float-right">
                      {this.state.types.map(type => (
                        <span
                          key={type}
                          className="badge badge-pill mr-1"
                          style={{
                            backgroundColor: `#${TYPE_COLORS[type]}`,
                            color: 'white'
                          }}
                        >
                          {type
                            .toLowerCase()
                            .split(' ')
                            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                            .join(' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className=" col-md-3 ">
                    <img
                      src={this.state.imageUrl}
                      className="card-img-top rounded mx-auto mt-2"
                    />
                  </div>
                  <div className="col-md-9">
                    <h4 className="mx-auto">
                      {this.state.name
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ')}
                    </h4>
                    <div className="row align-items-center">
                      <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                        HP
                      </div>
                      <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                        <div className="progress">
                          <div
                            className="progress-bar "
                            role="progressbar"
                            style={{
                              width: `${this.state.stats.hp}%`,
                              backgroundColor: `#${this.state.themeColor}`
                            }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <small>{this.state.stats.hp}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                        Attack
                      </div>
                      <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${this.state.stats.attack}%`,
                              backgroundColor: `#${this.state.themeColor}`
                            }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <small>{this.state.stats.attack}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                        Defense
                      </div>
                      <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                        <div className="progress">
                          <div
                            className="progress-bar "
                            role="progressbar"
                            style={{
                              width: `${this.state.stats.defense}%`,
                              backgroundColor: `#${this.state.themeColor}`
                            }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <small>{this.state.stats.defense}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                        Speed
                      </div>
                      <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${this.state.stats.speed}%`,
                              backgroundColor: `#${this.state.themeColor}`
                            }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <small>{this.state.stats.speed}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col">
                    <p className="">{this.state.description}</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="card-body">
                <h5 class="card-title text-center">Profile</h5>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-6">
                        <h6 className="float-right">Height:</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-left">{this.state.height} ft.</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-right">Weight:</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-left">{this.state.weight} lbs</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-right">Catch Rate:</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-left">{this.state.catchRate}%</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-right">Gender Ratio:</h6>
                      </div>
                      <div className="col-6">
                        <div class="progress">
                          <div
                            class="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${this.state.genderRatioFemale}%`,
                              backgroundColor: '#c2185b'
                            }}
                            aria-valuenow="15"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <small>{this.state.genderRatioFemale}</small>
                          </div>
                          <div
                            class="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${this.state.genderRatioMale}%`,
                              backgroundColor: '#1976d2'
                            }}
                            aria-valuenow="30"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <small>{this.state.genderRatioMale}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-6">
                        <h6 className="float-right">Egg_Groups:</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-left">{this.state.egg_groups} </h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-right">Hatch Steps:</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-left">{this.state.hatchSteps}</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-right">Abilities:</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-left">{this.state.abilities}</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-right">EVs:</h6>
                      </div>
                      <div className="col-6">
                        <h6 className="float-left">{this.state.evs}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer text-muted">

              </div>
            </div>
          </div>
        );
      }
    }
    



 
