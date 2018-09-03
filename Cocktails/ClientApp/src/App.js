import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from './Redux/actions';
import CocktailGrid from './Components/CocktailGrid';
import Selections from './Selections';
import NavBar from './Components/NavBar';
import RecipeModal from './Components/RecipeModal';

class App extends React.Component {
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
                <RecipeModal />
           </div>
       );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchData())
});

export default connect(null, mapDispatchToProps)(App);