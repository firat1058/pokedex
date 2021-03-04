import React, { Component } from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom';


const Sprite = styled.img`
    width: 5em;
    height: 5em`;

const Card = styled.div`
box-shadow: 0 1px 3px rgba(0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
&:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

}
`;
const StyledLink = styled(Link)`
test-decoration: none;
color: black;
&:focus;
&:hover;
&:visited;
&:link;
&:active {
    text-decoration: none;
}
`;

export default class PokemonCard extends Component {
state = {
    name: '',
    imageUrl: '',
    pokemonIndex:'',
    imageLoading: true,
    toMantRequest: false

    

};
componentDidMount() {
    const { id, name, image } = this.props;
    const pokemonIndex = id;
    const imageUrl = `https://intern-pokedex.myriadapps.com/images/pokemon/${id}.png`
    console.log(imageUrl)
    this.setState({
        name: name, 
        imageUrl: imageUrl,
        pokemonIndex: pokemonIndex
    });

}

    render() {

        return (
            <div className='col-md-3 col-sm-6 mb-5'>
                <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
                <Card className="card">
                    
                    <h5 className="card-header">{this.state.pokemonIndex}</h5>
                    <Sprite className="card-img-top rounded mx-auto mt-2"
                    onLoad={() => this.setState({imageLoading: false})}
                    onError={() => this.setState({ toManyRequests: true})}
                    src={this.state.imageUrl}
                    />
                    {this.state.toMantRequest ? (
                        <h6 className="mx-auto">
                            <span className="badge badge-danger mt-2">To Many Request</span>
                        </h6>
                    ) : null}
                    <div className="card-body mx-body">
                        <h6 className="card-title">
                            {this.state.name.toLowerCase()
                            .split(' ')
                            .map(
                                letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                            .join(' ')}</h6>
                    </div>
                    
                </Card>
                </StyledLink>
                
            </div>
        )
    }
}
