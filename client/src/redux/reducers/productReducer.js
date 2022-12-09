import {
  ADD_PRODUCT,
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  LOAD_PRODUCT,
  PRODUCT_LOADED,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
  REMOVE_PRODUCT,
} from "../actionTypes/actionTypes";

const initialState = {
  cart: [],
  wishlist: [],
  products: [],
};

const productReducer = (state = initialState, action) => {
  const selectCartProduct = state.cart.find(
    (product) => product._id === action.payload._id
  );

  const selectWishlistProduct = state.wishlist.find(
    (product) => product._id === action.payload._id
  );

  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    case ADD_TO_CART:
      if (selectCartProduct) {
        const newCart = state.cart.filter(
          (product) => product._id !== selectCartProduct._id
        );

        selectCartProduct.quantity = selectCartProduct.quantity + 1;

        return {
          ...state,
          cart: [...newCart, selectCartProduct],
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case REMOVE_FROM_CART:
      if (selectCartProduct.quantity > 1) {
        const newCart = state.cart.filter(
          (product) => product._id !== selectCartProduct._id
        );
        selectCartProduct.quantity = selectCartProduct.quantity - 1;

        return {
          ...state,
          cart: [...newCart, selectCartProduct],
        };
      }
      return {
        ...state,
        cart: state.cart.filter(
          (product) => product._id !== action.payload._id
        ),
      };

    case PRODUCT_LOADED:
      return {
        ...state,
        products: action.payload,
      };

    case ADD_TO_WISHLIST:
      if (selectWishlistProduct) return state;

      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (product) => product._id !== action.payload._id
        ),
      };

    case LOAD_PRODUCT:
      return {
        ...state,
        products: action.payload
      }

    default:
      return state;
  }
};

export default productReducer;
