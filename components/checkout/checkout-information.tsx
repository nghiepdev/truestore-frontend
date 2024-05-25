'use client';

import {formatCurrency} from '@automattic/format-currency';
import {useCart} from '@model/cart';

export default function CheckoutInformation() {
  const [{carts, subTotal}] = useCart();

  return (
    <>
      {carts.length > 0 ? (
        <div className='mb-7 space-y-3 divide-y divide-gray-300 sm:ml-7 [&>*:not(:first-child)]:pt-3'>
          {carts.map((cart, index) => {
            return (
              <div key={index} className='flex gap-x-5'>
                <div className='size-[120px] shrink-0 bg-white sm:size-[150px]'>
                  <img
                    src={cart.variation.image}
                    alt=''
                    className='object-contain object-center'
                  />
                </div>
                <div>
                  <h4
                    className='line-clamp-2 font-semibold'
                    title={cart.product.name}
                  >
                    {cart.product.name}
                  </h4>
                  <div className='flex items-center justify-between gap-x-2'>
                    <div className='mt-1 space-x-1 text-sm font-medium text-gray-900'>
                      {!!cart.variation.regular_price && (
                        <span className='text-gray-500 line-through'>
                          {formatCurrency(
                            parseFloat(cart.variation.regular_price),
                            'USD',
                            {
                              stripZeros: true,
                            }
                          )}
                        </span>
                      )}
                      <span>
                        {formatCurrency(
                          parseFloat(
                            cart.variation.sale_price || cart.variation.price
                          ),
                          'USD',
                          {
                            stripZeros: true,
                          }
                        )}
                      </span>
                    </div>
                    <span className='text-sm font-medium text-gray-600'>
                      x{cart.quantity}
                    </span>
                  </div>
                  <div className='mt-2'>
                    {cart.variation.attributes.map((attr, index) => (
                      <span
                        key={index}
                        className='block text-sm font-medium text-gray-500'
                      >
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='mb-7 w-[--w-base] max-w-full'>
          Your shopping cart is empty. Please add items before proceeding to
          checkout.
        </div>
      )}
      <hr className='-mr-8' />
      <dl className='my-7 ml-7 space-y-6 text-sm font-medium text-gray-500'>
        <div className='flex justify-between gap-x-2'>
          <dt>Subtotal</dt>
          <dd className='text-gray-900'>
            {formatCurrency(subTotal, 'USD', {
              stripZeros: true,
            })}
          </dd>
        </div>
        <div className='flex justify-between gap-x-2'>
          <dt>Shipping</dt>
          <dd className='text-gray-900'>
            {formatCurrency(0, 'USD', {
              stripZeros: true,
            })}
          </dd>
        </div>
      </dl>
      <hr className='-mr-8' />
      <div className='ml-7 mt-8 flex justify-between gap-x-2 font-semibold text-gray-900'>
        <span>Total</span>
        <span>
          {formatCurrency(subTotal, 'USD', {
            stripZeros: true,
          })}
        </span>
      </div>
    </>
  );
}
