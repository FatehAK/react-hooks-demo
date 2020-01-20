import React, { useState, useEffect } from 'react';
import Child from './Child';

const initialValue = 10;
const App = () => {
    console.log('parent rerender');
    const [count, setCount] = useState(initialValue);
    const [someState, setSomeState] = useState({ x: 10, y: 10 });

    useEffect(() => {
        console.log('parent effect 1');
    });

    useEffect(() => {
        console.log('parent effect 2');
    });

    return (
        <div>
            <Child count={count} setCount={setCount} initialValue={initialValue} />
            <button onClick={() => setSomeState({ ...someState, y: 30 })}>Click</button>
        </div>
    );
}

export default App;
