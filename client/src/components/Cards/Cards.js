import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {faSackDollar} from '@fortawesome/free-solid-svg-icons'
import './Cards.css'
const Cards = ({ name, money, icon }) => {
    return (
        <div className='card'>
            <div className='content'>
                <h1>{name}</h1>
                <h3>{money}</h3>
            </div>

            <div >
                <FontAwesomeIcon icon={icon} className='icon' />
            </div>


        </div>
    )
}

export default Cards
