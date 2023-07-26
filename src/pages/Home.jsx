import React from 'react'
import Product from '../components/Product';
import offers from "../images/offers.jpeg"
import sitaRamam from "../images/Yashoda.jpg"
import {Link} from "react-router-dom"
import "./Home.css"
import { db } from "../components/firebase";
import { useState, useEffect } from 'react';


function Home() {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    db
    .collection('products')
    .onSnapshot(snapshot => (
        setProds(snapshot.docs.map(doc => doc.data()))
    ))
  }, [])


  return (
    <>
        <div className='home'>

            <Link to="/accessories">
              <img className='home_image' src={offers} alt=""/>
            </Link>
            <div className='rows_wrapper'>
            <div className='home_row'>
                <Product 
                  id={prods[0]?.id}
                  title={prods[0]?.title}
                  price={prods[0]?.price}
                  rating={prods[0]?.rating}
                  image={prods[0]?.image}
                />
                <Product 
                  id={prods[1]?.id}
                  title={prods[1]?.title}
                  price={prods[1]?.price}
                  rating={prods[1]?.rating}
                  image={prods[1]?.image}
                />
            </div>
            <div className='home_row'>

              <div className='prime-image-container'>
                <img className='prime-movie-image' src={sitaRamam} alt='' useMap='#primeImgMap'/>
                <map name="primeImgMap">
                  <Link to='/'>
                    <area shape="rect" coords="0,80,700,500" alt='' href="#"/>
                  </Link>
                </map>
                <div className="prime-video">Prime Video: Recommended for you</div>
                <div className="movie-name">Yashoda</div>
                <Link to='/'>
                  <div className="watch-on-prime">Start watching it on prime</div>
                </Link>
              </div>
              <Product 
                  id={prods[2]?.id}
                  title={prods[2]?.title}
                  price={prods[2]?.price}
                  rating={prods[2]?.rating}
                  image={prods[2]?.image}
                />
            </div>
            <div className='home_row'>
              <Product 
                  id={prods[3]?.id}
                  title={prods[3]?.title}
                  price={prods[3]?.price}
                  rating={prods[3]?.rating}
                  image={prods[3]?.image}
              />
              <Product 
                id={prods[4]?.id}
                title={prods[4]?.title}
                price={prods[4]?.price}
                rating={prods[4]?.rating}
                image={prods[4]?.image}
              />
              <Product 
                id={prods[5]?.id}
                title={prods[5]?.title}
                price={prods[5]?.price}
                rating={prods[5]?.rating}
                image={prods[5]?.image}
              />
            </div>
            
            </div>
        </div>
    </>
  );
}

export default Home;