import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { fetchData } from './Actions.jsx';
import store from './Store.jsx';
import CocktailGrid from './Components/CocktailGrid.jsx';
import Selections from './Selections.jsx';
import NavBar from './Components/NavBar.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchData();
    }

    render() {
        return (       
           <div>
               <NavBar />
               <Selections />
               <div className="container-fluid" style={{position: 'relative' }}>
                   <div className="row">
                       <CocktailGrid />
                   </div>
               </div>
           </div>
       );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchData())
});

App = connect(null, mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById("content"));