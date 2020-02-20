import React, { useContext } from 'react';
import { ThemeContext } from './App';

//use React.memo() to perform shallow comparison of props (note: obj comparison, array comparison, function comparison will fail so make sure to wrap it in useCallback or useMemo)
const Child = React.memo((props) => {
    const theme = useContext(ThemeContext);
    console.log(theme);

    console.log(`${props.text} rerendered`);
    console.log('the memoval', props.memoVal);
    return (
        <button onClick={props.onClick}>{props.text}</button>
    );
});

export default Child;
