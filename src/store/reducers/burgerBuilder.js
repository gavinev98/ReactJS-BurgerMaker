import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {

        ingredients: null,
        totalPrice: 4,
        error: false,
        building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {

    //creating switch for different types
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:
       //storing updated properties in javascript object.
       const updatedIngredient = {  [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
       //passing old state plus the updated properties using utility function.
       const updatedIngredients = updateObject(state.ingredients, updatedIngredient );
       //store the updated state of all inside a new object.
       const updatedState = {
           ingredients: updatedIngredients,
           totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
           building:true
       }
       //return the updated object by passing old object plus new state.
       return updateObject(state, updatedState);

        case actionTypes.REMOVE_INGREDIENT:
            //storing updated properties in javascript object.
            const updatedIng = {  [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            //passing old state plus the updated properties using utility function.
            const updatedIngs = updateObject(state.ingredients, updatedIng );
            //store the updated state of all inside a new object.
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
            //return the updated object by passing old object plus new state.
            return updateObject(state, updatedSt);

        case actionTypes.SET_INGREDIENTS:
          //using update object for setting state.
          return updateObject(state, {
                
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false,
                building:false
            } );
        
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {
                
                error: true
            } );
        default:
            return state;
    }

    return state;
}


export default reducer;