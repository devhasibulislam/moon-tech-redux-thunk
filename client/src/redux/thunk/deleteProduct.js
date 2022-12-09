import { removeProduct } from "../actions/productActions";

const deleteProductData = (id) => {
  return async (dispatch, getState) => {
    const res = await fetch(`https://moon-tech-redux-thunk-ssr.vercel.app/product/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.acknowledged) {
      dispatch(removeProduct(id));
    }
  };
};

export default deleteProductData;
