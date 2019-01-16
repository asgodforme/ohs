import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';

const Products = ({ dispatch, products1 }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products1/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete()} products={products1} />
    </div>
  );
};

// export default Products;
export default connect(({ products1 }) => ({
  products1,
}))(Products);