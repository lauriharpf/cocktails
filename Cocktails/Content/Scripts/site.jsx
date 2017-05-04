import React from 'react';
import ReactDOM from 'react-dom';
import CocktailGrid from './CocktailGrid.jsx';

ReactDOM.render(
    <CocktailGrid url="/api/cocktails" />, document.getElementById("content")
);