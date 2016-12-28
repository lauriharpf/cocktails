var CocktailButton = React.createClass({
    render: function() {
        return (
            <div className="col-sm-4" style={{ textAlign: "center" }}>
                <img src="/images/cocktail_no_image_extra_small.jpg" width="50" height="78" />
                <h6>{this.props.name}</h6>
            </div>
        );
    }
});

var CocktailGrid = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <CocktailButton name="Mai Tai" />
                    <CocktailButton name="Cosmopolitan"/>
                    <CocktailButton name="Mojito" />
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <CocktailGrid/>, document.getElementById('content')
);