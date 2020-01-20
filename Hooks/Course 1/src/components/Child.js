import React, { useEffect, useState } from 'react';

const incrementCount = (setCount) => {
    setCount(prevCount => prevCount + 1);
};

const Child = ({ count, initialValue, setCount }) => {
    const [childValue, setChildValue] = useState(10);
    console.log('child rerender');

    useEffect(() => {
        console.log('child effect 1');
    });

    useEffect(() => {
        console.log('child effect 2');
    });

    return (
        <div>
            <p>The count is: {count}</p>
            <button onClick={() => setCount(initialValue)}>Reset</button>
            <button onClick={() => incrementCount(setCount)}>+</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <button onClick={() => setChildValue(prevChildValue => prevChildValue - 1)}>Child</button>
        </div>
    );
};

export default Child;
