import "../../css/page/product.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Price = (props: { price: number; discountPercentage: number }) => {
  return (
    <>
      {props.discountPercentage > 0 ? (
        <>
          <span className='product-price price'>
            ${props.price?.toFixed(2)}
          </span>
          <span className='product-price '>
            &nbsp; &nbsp; $
            {parseFloat(
              ((props.price * (100 - props.discountPercentage)) / 100)?.toFixed(
                2
              )
            )}
          </span>
        </>
      ) : (
        <>
          <p className='product-price '>${props.price?.toFixed(2)}</p>
        </>
      )}
    </>
  );
};

export default Price;
