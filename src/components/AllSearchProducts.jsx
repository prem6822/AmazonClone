import React from 'react'
import SearchProduct from './SearchProduct'
import allproducts from "../AllProducts"
import "./AllSearchProducts.css"
import { useStateValue } from './StateProvider'




function AllSearchProducts() {
    const [{searchInp},dispatch] = useStateValue();
  return (
    <>
        <div className='allsearchproducts'>
        {
            allproducts.map( (props) => {
                if(props.title.toLowerCase().includes(searchInp.toLowerCase())){
                    return (
                        <SearchProduct 
                            id={props.id}
                            title={props.title}
                            price={props.price}
                            rating={props.rating}
                            image={props.image}
                        />
                    )
                }
            })
        }
        </div>
    </>
  )
}

export default AllSearchProducts