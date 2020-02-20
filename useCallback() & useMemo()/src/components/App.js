import React, { useState, useCallback, useMemo } from 'react';
import Child from './Child';

const theme = {
    dark: {
        background: '#333',
        color: '#fff'
    },
    light: {
        background: '#fff',
        color: '#000'
    }
};

export const ThemeContext = React.createContext(theme);

//useCallback vs useMemo
// useCallback, which caches the provided function instance, useMemo invokes the provided function and caches its result.
const App = () => {

    //here setC and setDelta are stable accross rerenders
    const [c, setC] = useState(0);
    const [delta, setDelta] = useState(0);

    //these function are new every time this component rerenders so useCallback()
    // const incrementC = () => setC((c) => c + 1);
    // const incrementDelta = () => setDelta((delta) => delta + 1);

    //so useCallback to keep the functions stable across renders
    const incrementC = useCallback(() => setC((c) => c + 1), []);
    // const incrementC = useCallback(() => setC(c + 1), [c]); //this will also cause rerender of child since on changing `c` a new function is created
    //pass `c` in deps here so that it can access the newer value of c (i.e a newer function is created) (know when to use the callback style vs the param style)
    const incrementDelta = useCallback(() => setDelta((delta) => delta + c), [c]);

    const incrementBoth = useCallback(() => {
        incrementDelta();
        incrementC();
    }, [incrementC, incrementDelta]);

    const doNothing = useCallback(() => console.log('nothing'), []);

    //useMemo for avoiding expensive computation (it will do the computation only when the value in deps changes)
    const memoizedVal = useMemo(() => {
        console.log('recomputing');
        return Math.sin(c);
    }, [c]);
    //memoized Array (since new array reference is created)
    // const memoizedVal = useMemo(() => [1, 2, 3], []);
    //memoized obj (since new object reference is created)
    // const memoizedVal = useMemo(() => ({ a: 1 }), []);

    return (
        <div className="app">
            <div>
                <p>C is {c}</p>
                <p>Delta is {delta}</p>
            </div>
            <div>
                <ThemeContext.Provider value={theme.light}>
                    <Child onClick={incrementC} text="setC" />
                    <Child onClick={incrementDelta} text="setDelta" />
                    <Child onClick={incrementBoth} text="setBoth" />
                    <Child onClick={doNothing} memoVal={memoizedVal} text="memoCheck" />
                </ThemeContext.Provider>
            </div>
        </div>
    );
}

export default App;

//NOTES
// useMemo() is to memoize a calculation result between a function's calls and between renders
// useCallback() is to memoize a callback itself (referential equality) between renders
// useRef() is to keep data between renders (updating does not fire re-rendering)
// useState() is to keep data between renders (updating will fire re-rendering)
