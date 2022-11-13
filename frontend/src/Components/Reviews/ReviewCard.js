import React from 'react'
import { baseUrl } from '../../Shared/baseUrl';
import axios from 'axios';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import FilledBeerIcon from '../../assets/FilledBeerIcon';
import EmptyBeerIcon from '../../assets/EmptyBeerIcon';


export default function ReviewCard(props) {

    const [reviewedBeer,setReviewedBeer] = React.useState({})
    const [owner, setOwner] = React.useState({})  
    
    const token = useSelector(state=>state.token.token);
    const user = useSelector(state=>state.user);

   

    React.useEffect(()=>{
        setAuthHeader(token)
        getReviewedBeer()
        getOwner()
    },[token])

    async function getReviewedBeer() {
        try {
            // get beer of review 
            let response = await axios.get(baseUrl + `/beers/${props.beerId}`);
            // and save to state
            setReviewedBeer(response.data);
        } catch (ex) {
            alert(ex);
        }
    }

    async function getOwner() {
        try {
            // get owner of review 
            let response = await axios.get(baseUrl + `/users/user/${props.userId}`);
            // and save to state
            setOwner(response.data);
        } catch (ex) {
            alert(ex);
        }
    }


  return (
    <div className='review card' >
        <img className="img-fluid img-brewery-details" src={reviewedBeer.imgUrl} />
        <div className='review-body card-body' >
            <h5 className='review-title card-title'><Link to={"/beer-info?" + reviewedBeer.beerId}>{reviewedBeer.name}</Link></h5>
            <Rating icon={<FilledBeerIcon />} emptyIcon={<EmptyBeerIcon/>} name="read-only" className='review-rating' value={props.rating} readOnly precision={0.5}/>
            <p className='review-text card-text'>Reviewed By: {owner.username}</p>
            <p className='review-text card-text'>{props.description}</p>
        </div>
    </div>
  )
}
