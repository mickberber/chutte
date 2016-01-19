import fetch from 'whatwg-fetch';
import {GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE} from './actionConstants';

export function getProducts(){
  return {
    type: GET_PRODUCTS
  };
}

export function getProductsSuccess(products){
  return {
    type: GET_PRODUCTS_SUCCESS,
    products: products
  };
}

export function getProductsFailure(err){
  return {
    type: GET_PRODUCTS_FAILURE,
    err: err
  };
}

export function fetchProducts(){
  return function(dispatch){
    dispatch(getProducts());
      return fetch('/api/items/')
      .then(function(response) {
        return response.json();
      })
      .then(function(parsedJson){
        dispatch(getProductsSuccess(parsedJson));
      })
      .catch(function(err){
        dispatch(getProductsFailure(err));
      });
  };
}