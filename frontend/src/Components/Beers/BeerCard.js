
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';
function BeerCard(props) {


  const [breweryName, setBreweryName] = useState("");
  // get token and current user from redux store
  const token = useSelector(state => state.token.token);

  // set auth token in axios header before loading list of beers
  useEffect(() => {
    setAuthHeader(token);
    getBreweryName();
  }, [token]);

  // update beer in state for each change in every form element


  async function getBreweryName() {
    if (props.breweryId > 0) {
      let response = await axios.get(baseUrl + "/breweries/" + props.breweryId);
      setBreweryName(response.data.name);
    }
  }

  // change display based on access
  return (

    <div className='card m-2'>
      <div className='card-body'>
        <p>Beer Name: {props.name}</p>
        <p>Brewery Name: {breweryName}</p>
        <p>Beer Description: {props.description}</p>
        <p>Alcohol By Volume (%) = {props.abv}%</p>
        <p>Beer Type: {props.type}</p>
        <img className='beer-card-img' src={props.imgUrl} />
        <Link to={"/review-info?beerId=" + props.beerId}><button className="btn btn-primary" type="button">Add Review</button></Link>
      </div>
    </div>

  )
}
export default BeerCard;