// The use client directive marks this component for CSR this is required for
// reactivity such as clicking

'use client';
import React from 'react';

const AddToCart = () => {
    return (
        <div>
            <button onClick={() => console.log('Click')}>
                Add to Cart
            </button>
        </div>
    )
}

export default AddToCart;
