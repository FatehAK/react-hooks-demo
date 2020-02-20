import React, { useEffect, useState, useCallback, useRef } from 'react';

const incrementCount = (setCount) => {
    setCount(prevCount => prevCount + 1);
};

const Child = ({ count, initialValue, setCount }) => {
    const [childValue, setChildValue] = useState(10);

    //measure size of dom node when its shown
    const [show, setShow] = useState(false);
    const [height, setHeight] = useState(0);
    //use callback ref instead of ref since we need to compute height on click (since its hidden on start)
    //also callback ref can be used to set state or do some computation (similiar to <div ref={(elem) => this.elem = elem})></div>
    const measuredRef = useCallback((node) => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
        }
    }, []);

    //to demo closure issue with hooks
    //initially we don't pass `myVal` in deps array so our `myVal` becomes stale but even if pass `myVal` to deps, setVal() will be called every 1s causing a rerender and runs the effect again (so the interval is cleared and then set again) to avoid this use a callback style of setstate
    const [myVal, setMyVal] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setMyVal((v) => v + 1);
        }, 1000);
        return () => clearInterval(id);
    }, []);
    //!AVOID THIS BELOW
    // useEffect(() => {
    //     const id = setInterval(() => {
    //         console.log('interval set');
    //         setMyVal(myVal + 1);
    //     }, 1000);
    //     return () => {
    //         console.log('interval cleared'); clearInterval(id);
    //     }
    // }, [myVal]);

    const a = useState(1);
    const b = useState(2);
    const myCallback = useCallback(() => {
        doSomething(a, b);
    }, [a, b]);
    function doSomething(a, b) {
        console.log(a + b);
    }

    console.log('child rerender');

    useEffect(() => {
        console.log('child effect', childValue);
    });

    return (
        <div>
            <p>The count is: {count}</p>
            <button onClick={() => setCount(initialValue)}>Reset</button>
            {/* set parent state from outside */}
            <button onClick={() => incrementCount(setCount)}>+</button>
            {/* set parent state */}
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            {/* access previous value */}
            <button onClick={() => setChildValue(prevChildValue => prevChildValue - 1)}>Child</button>
            {/* show div on click */}
            <button onClick={() => setShow((prevShow) => !prevShow)}>Show Div</button>
            {show && (
                <div className="my-div" ref={measuredRef}>
                    foo {height}
                </div>
            )}
            <div>{myVal}</div>
        </div>
    );
};

export default Child;
