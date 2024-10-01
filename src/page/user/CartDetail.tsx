import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../../app/service/shared/store";
import { ProductReadDto } from "../../app/data/dto/productAggregate/productDtos";
import { baseServerAddress } from "../../app/service/shared/baseUrl";
import { productActions } from "../../app/service/productAggregate/productSlice";
import { cartDetailActions } from "../../app/service/orderAggregate/cartDetailSlice";
import { CartDetailCreateDto } from "../../app/data/dto/orderAggregate/cartDetailDto";
import "../../css/page/cartDetail.css";

import Price from "../../component/shared/Price";
import { orderActions } from "../../app/service/orderAggregate/orderSlice";

interface CartItem {
  cartItemId: number;
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
  stock: number;
  discountPercentage: number | null;
}
const CartDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { data: cartDetails } = useSelector(
    (state: RootState) => state.cartDetailR
  );

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const { userId } = useSelector((state: RootState) => state.authR);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(true);

  useEffect(() => {
    isChanged && fetchCartItems();
    setIsChanged(false);
  }, [cartDetails]);

  const fetchCartItems = async () => {
    dispatch(cartDetailActions.getByUserCartDetail(userId));
    const fetchedCartItems: CartItem[] = [];
    for (const cartDetail of cartDetails.items) {
      var response = await dispatch(
        productActions.getProduct(cartDetail.productId)
      ).unwrap();
      const product = response as ProductReadDto;
      if (product) {
        fetchedCartItems.push({
          cartItemId: cartDetail.id,
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: cartDetail.quantity,
          total:
            (product.price *
              cartDetail.quantity *
              (100 - (product.discountPercentage ?? 0))) /
            100,
          image: product.imageUrl?.includes("product")
            ? `${baseServerAddress}/${product.imageUrl}`
            : product.imageUrl,
          stock: product.stock,
          discountPercentage: product.discountPercentage,
        });
      }
    }
    setCartItems(fetchedCartItems);
  };
  const HandleCheckout = async () => {
    await dispatch(orderActions.checkoutOrder(userId));
    await dispatch(cartDetailActions.getByUserCartDetail(userId));
    setCheckoutSuccess(true);
  };
  const handleQuantityChange = async (
    id: number,
    delta: number,
    available: boolean,
    cartDetailId: number = -1,
    finalQuantity: number = -1
  ) => {
    console.log(finalQuantity);
    if (!available) {
      toast.info("Sorry! Not enough stock for this product.");
      return;
    }
    if (finalQuantity == 0) {
      await dispatch(cartDetailActions.deleteCartDetail(cartDetailId));
      setIsChanged(true);

      return;
    }
    const newCartDetail: CartDetailCreateDto = {
      userId: userId,
      productId: id,
      quantity: delta,
    };
    setIsChanged(true);

    await dispatch(
      cartDetailActions.createOrUpdateCartDetail(newCartDetail)
    ).unwrap();
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.total;
    }, 0);
  };
  const calculateDiscount = () => {
    return cartItems.reduce((accumulator, currentItem) => {
      return (
        accumulator +
        (currentItem.price *
          currentItem.quantity *
          (currentItem.discountPercentage ?? 0)) /
          100
      );
    }, 0);
  };
  const calculateTotal = () => {
    const netPrice = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.total;
    }, 0);
    return netPrice * 0.9;
  };

  return (
    <div className='cart'>
      {checkoutSuccess ? (
        <div className='checkout-success-message'>
          <h2>Thank You for Your Purchase!</h2>
          <p>
            Your checkout was successful. We’ve received your order and are now
            processing it. You will receive an email confirmation with the order
            details shortly.
          </p>
          <p>
            If you have any questions or need further assistance, feel free to{" "}
            <a href='/contact'>contact us</a>.
          </p>
          <p>Happy riding!</p>
        </div>
      ) : cartItems.length ? (
        <div>
          <h1>Your Cart ({cartItems.length} items)</h1>
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className='cart-item'>
                <div className='item-details'>
                  <img src={item.image} alt={item.name} />
                </div>
                {/* <div className='item-price'>${item.price.toFixed(2)}</div> */}
                <div className='item-price'>
                  <Price
                    discountPercentage={item.discountPercentage ?? 0}
                    price={item.price}
                  />
                </div>
                <div className='item-quantity'>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        -1,
                        true,
                        item.cartItemId,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        1,
                        item.stock > item.quantity
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <div className='item-total'>${item.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className='cart-summary'>
            <div>Subtotal: ${calculateSubtotal().toFixed(2)}</div>
            <div>Tax: ${(calculateSubtotal() * 0.1).toFixed(2)}</div>
            <h2>Total: ${calculateTotal().toFixed(2)}</h2>
            <div className='disount'>
              Your profit of this purchase: ${calculateDiscount().toFixed(2)}
            </div>
          </div>
          <button className='checkout-btn' onClick={HandleCheckout}>
            Checkout
          </button>
          <button className='checkout-btn' onClick={() => navigate("/product")}>
            Continue Shopping!
          </button>
        </div>
      ) : (
        <span>
          Your cart is empty! Place your first order and start shopping!
        </span>
      )}
    </div>
  );
};

export default CartDetail;
