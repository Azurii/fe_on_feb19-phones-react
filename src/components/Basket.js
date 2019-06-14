import React from 'react';

const Basket = (props) => {
  const ids = Object.keys(props.items);

  console.log(ids);

  return (
    <section>
      <p>Shopping Cart</p>
      <ul>
        { ids.map(phoneId => (
          <li key={phoneId}>
            {phoneId} - {props.items[phoneId]}
            <button onClick={() => props.onRemove(phoneId)}>
              x
            </button>
          </li>
        )) }
      </ul>
    </section>
  );
};

export default Basket;
