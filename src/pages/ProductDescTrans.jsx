import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'
import { RENT_PRODUCT, GET_PRODUCT_BY_ID, BUY_PRODUCT, AVAILABLE_PRODUCTS, GET_USER_PRODUCTS, GET_PRODUCTS_RELATED_TO_USER, BOOKING_TIMES } from '../services/queries'
import { useState, useEffect } from 'react'
import client from '../services/client';
import flatpickr from 'flatpickr'
import "flatpickr/dist/themes/material_blue.css";

function ProductDescTrans()
{
    let { id } = useParams();
  id = parseInt(id);
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  const date = new Date();

  async function fetchData(){
    const response = await client.query({
        query: BOOKING_TIMES,
        variables: { id }
    });
    return response.data.findFutureBookingsByProductId;
    }

  const [pickDate, setPickDate] = useState('');

  const navigate = useNavigate();

  const [doBuyProduct] = useMutation(BUY_PRODUCT);
  const [doRentProduct] = useMutation(RENT_PRODUCT);

  const [buyProduct, setBuyProduct] = useState(false);
    const [rentProduct, setRentProduct] = useState(false);

  if(loading) return <p>Loading...</p>
    //if(error) return <p>Error :{error.message}</p>

    const product = data.findOneProduct;

    const handleBuy = () => {
        console.log('Buy');
        setRentProduct(false);
        setBuyProduct(true);
    }

    const handleRent = async() => {
        setRentProduct(true);
        setBuyProduct(false);
        console.log('Rent');

        
        const blockedTimes = await fetchData();
        console.log(blockedTimes);

        flatpickr('#rentDates', {
            mode: 'range',
            minDate: 'today',
            maxDate: new Date().fp_incr(30), // 30 days from now
            dateFormat: 'Y-m-d',
            disable: [
                function(date){
                    for(let i = 0; i < blockedTimes.length; i++){
                        if(date >= new Date(blockedTimes[i].start_date) && date <= new Date(blockedTimes[i].end_date)){
                            return true;
                        }
                    }
                }
            ]
        });
        
    }

    const handleBuyConfirm = async() => {
        client.clearStore();
        const response = await doBuyProduct({ 
            variables: { id: product.id } 
        }, { 
            refetchQueries: [
                { query: AVAILABLE_PRODUCTS }, 
                { query: GET_USER_PRODUCTS }, 
                { query: GET_PRODUCTS_RELATED_TO_USER }
            ]
        }
        );

        console.log(response);
        if(response.data.buyProduct){
            navigate('/product');
        }
        else{
            console.log('Buy failed');
        }
    }

    const handleBuyCancel = () => {
        console.log('Buy Cancel');
        setBuyProduct(false);
    }

    const handleRentConfirm = async() => {
        console.log('Rent Confirm');
        const dates = document.getElementById('rentDates').value;
        const dateArray = dates.split(' to ');
        if(dateArray.length !== 2){
            dateArray.push(dateArray[0]);
        }
        const start_time = new Date(dateArray[0]).toISOString();
        const end_time = new Date(dateArray[1]).toISOString();
        console.log(start_time, end_time);
        client.clearStore();
        const response = await doRentProduct({
            variables: { id: product.id, start_date: start_time, end_date: end_time }
        }, {
            refetchQueries: [
                { query: AVAILABLE_PRODUCTS }, 
                { query: GET_USER_PRODUCTS }, 
                { query: GET_PRODUCTS_RELATED_TO_USER },
                { query: BOOKING_TIMES, variables: { id: product.id } }
            ]
        });

        if(response.data.rentProduct){
            navigate('/product');
        }
        else{
            console.log('Rent failed');
        }
    }

    const handleRentCancel = () => {
        console.log('Rent Cancel');
        setRentProduct(false);
    }


    return (
        <div>
            <h1>Product</h1>
            <h2>{product.title}</h2>
            <p>Categories:
            {product.categories.map((category, index) => (
            <span key={index}>|{category.category_name}| </span>
            ))}
            </p>
            <p>Sell Price: {product.sell_price}</p>
            <p>Rent Price Daily: {product.rent_price_daily}</p>
            <p>{product.description}</p>
            <p>Status: {product.status}</p>
            {product.status!=='SOLD' && (
            <>
                <button onClick={handleBuy}>Buy</button>
                <button onClick={handleRent}>Rent</button>
            </>
            )   
            }
            {buyProduct && (
                <div>
                    <p>Are you sure you want to buy this product?</p>
                    <button onClick={handleBuyConfirm}>Yes</button>
                    <button onClick={handleBuyCancel}>No</button>
                </div>
            )}
            {rentProduct && (
                <div>
                    <p>Select dates</p>
                    <div>
                        <input type="text" id="rentDates" />
                    </div>
                    <button onClick={handleRentConfirm}>Yes</button>
                    <button onClick={handleRentCancel}>No</button>
                </div>
            )}
        </div>
    )    
}

export default ProductDescTrans