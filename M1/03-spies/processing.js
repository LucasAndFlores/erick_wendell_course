const data = require("./test");

const clientToUseAtPic = {
  variantId: 87799,
  productFilter: {
    retailer_id: {
      i_is_any: [],
    },
  },
};

data.products.forEach((product) => {
  clientToUseAtPic.productFilter.retailer_id.i_is_any.push(product.retailer_id);
});

console.log(clientToUseAtPic.productFilter.retailer_id.i_is_any);
