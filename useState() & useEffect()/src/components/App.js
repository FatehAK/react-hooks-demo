import React, { useState, useEffect, useRef } from 'react';
import Child from './Child';

const initialValue = 10;

function getInitialValue() {
    console.log('normal state (run on every render)');
    return 10;
}

const App = () => {
    console.log('parent rerender');
    //useState (default style)
    const [count, setCount] = useState(getInitialValue());
    //useState with object initial value
    const [someState, setSomeState] = useState({ x: 10, y: 10 });
    //useState lazy function style only runs on the initial render
    const [another, setAnotherState] = useState(() => {
        console.log('lazy state (run once)');
        return 'test';
    });
    console.log('func state:', another);

    //normal element ref
    const divRef = useRef();
    //store the interval ref (replacement of instance variable)
    const intervalRef = useRef();
    //prev item ref
    const prevRef = useRef();

    //this effect runs only when the cout value changes
    useEffect(() => {
        //if calling some function inside that uses prop make sure to add that `prop` to the deps array
        //if having function outside and calling inside make sure to add that `function` to the deps array and wrap in in useCallback and pass it the prop to `deps`
        function doSomething() {
            console.log('mounted', count);
        }
        doSomething();
        return () => {
            console.log('unmounted');
        }
    }, [count]); //the deps array can contain props/state or any item derived from it or an empty [] or nothing

    //this effect is similiar to standard class component style (componentDidMount and componentWillUnmount)
    useEffect(() => {
        console.log('mounted');
        console.log('the ref', divRef);
        return () => {
            console.log('unmounted');
        }
    }, []);

    //this effect stores reference of inteveral in a ref
    useEffect(() => {
        console.log('in interval');
        const id = setInterval(() => console.log('interval'), 1000);
        //set ref to this value
        intervalRef.current = id;
        return () => {
            clearInterval(intervalRef.current);
        };
    });

    //getting previous props/state
    useEffect(() => {
        prevRef.current = count;
    });

    console.log('the count', count);
    console.log('the prev', prevRef.current);

    //note: order of hooks call is important (don't have hooks inside conditionals, loops and inner functions)
    // const name = '';
    // useEffect(() => console.log('effect 1'));
    // if(name === '') {
    //     useEffect(() => console.log('effect 2'));
    // }
    // useEffect(() => console.log('effect 3'));

    //in case of conditons needed then add the condition inside the hook itself
    // const name = '';
    // useEffect(() => console.log('effect 1'));
    // useEffect(() => {
    // if(name === '') {
    // console.log('effect 2'));
    // }
    // });
    // useEffect(() => console.log('effect 3'));

    return (
        <div ref={divRef}>
            {/* shallow clone the object and manually merge since updates are not merged by default since it basically replaces the state*/}
            <button onClick={() => setSomeState({ ...someState, y: 30 })}>Click</button>
            {/* use the ref value to clear the interval */}
            <button onClick={() => { clearInterval(intervalRef.current) }}>Clear Timer</button>
            {/* the child effect runs first (in case of child sets state of parent) */}
            <div>
                <Child count={count} setCount={setCount} initialValue={initialValue} />
            </div>
        </div>
    );
}

export default App;

//a custom hook that gets the previous value
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
