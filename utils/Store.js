import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    billingAddress: Cookies.get('billingAddress') //shippingAddress //shippingAddress
      ? JSON.parse(Cookies.get('billingAddress')) //shippingAddress
      : { location: {} },
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
    aboModell: Cookies.get('aboModell')
      ? Cookies.get('aboModell')
      : '',
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };
    case 'SAVE_BILLING_ADDRESS': //SAVE_SHIPPING_ADDRESS
      return {
        ...state,
        cart: {
          ...state.cart,
          billingAddress: { //shippingAddress
            ...state.cart.billingAddress, //shippingAddress
            ...action.payload,
          },
        },
      };
    case 'SAVE_BILLING_ADDRESS_MAP_LOCATION': //SAVE_SHIPPING_ADDRESS_MAP_LOCATION
      return {
        ...state,
        cart: {
          ...state.cart,
          billingAddress: {    //shippingAddress
            ...state.cart.billingAddress,  //shippingAddress
            location: action.payload,
          },
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

      //neu
      case 'SAVE_ABO_MODELL':
        return {
          ...state,
          cart: { ...state.cart, aboModell: action.payload },
        };

    //neu
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          billingAddress: { location: {} }, //shippingAddress
          paymentMethod: '',
        },
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
