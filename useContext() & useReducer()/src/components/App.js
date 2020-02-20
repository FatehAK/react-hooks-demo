import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';
import Child from './Child';

const initialCount = {
    count: 0
};

const countReducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT_BY5':
            return { count: state.count + action.payload };
        case 'DECREMENT_BY5':
            return { count: state.count - action.payload };
        case 'RESET_COUNT':
            return initialCount;
        default:
            return state;
    }
};

const App = () => {
    //use reducer is preferable when we have multiple sub values (complex state logic) in our state
    // const [state, dispatch] = useReducer(countReducer, initialCount);
    //use reducer with lazy initialization (can be useful if u want to reset the state later)[in case we are getting the initial state from props]
    const [state, dispatch] = useReducer(countReducer, initialCount);
    console.log('the state', state);

    return (
        <div className="app">
            <div>
                <p>Parent</p>
                <button onClick={() => dispatch({ type: 'INCREMENT_BY5', payload: 5 })}>Increment By 5</button>
                <button onClick={() => dispatch({ type: 'DECREMENT_BY5', payload: 5 })}>Decrement By 5</button>
                <button onClick={() => dispatch({ type: 'RESET_COUNT' })}>Reset</button>
            </div>
            <div>
                <p>Child</p>
                <Child initialValue={100} />
            </div>
        </div>
    );
}

export default App;
