var CocktailButton = React.createClass({
    render: function () {
        var src = "/images/cocktail_no_image_extra_small.jpg";
        if (this.props.cocktail.image) {
            src = "/images/drinks/" + this.props.cocktail.image;
        }

        return (
            <div className="col-sm-4 cocktailButton" style={{ textAlign: "center" }} data-toggle="modal" data-target={"#modal" + this.props.cocktail.id}>
                <img src={src} width="50" height="78" />
                <h6>{this.props.cocktail.name}</h6>
                <CocktailDetails cocktail={this.props.cocktail} />
            </div>
        );
    }
});

var CocktailDetails = React.createClass({
    render: function() {
        var ingredients = this.props.cocktail.ingredients.map(function(ingredient) {
            return (
                <li key={ingredient}>{ingredient}</li>
            );
        });
        return (
            <div className="modal fade" id={"modal" + this.props.cocktail.id} tabIndex="-1" role="dialog" aria-labelledby={"modalLabel" + this.props.cocktail.id} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id={"modalLabel" + this.props.cocktail.id}>{this.props.cocktail.name}</h4>
                        </div>
                        <div className="modal-body">
                            <h6>Ingredients</h6>
                            <ul>
                                {ingredients}
                            </ul>

                            <h6>Instructions</h6>
                            {this.props.cocktail.instructions}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var CocktailGrid = React.createClass({
    getInitialState: function() {
        return { data: [] };
    },
    componentWillMount: function () {
        var component = this;
        $.get(this.props.url)
            .done(function(data) {
                component.setState({ data: data });
            })
            .fail(function() {
                alert("Sorry! Fetching cocktails went horribly wrong. Try refreshing the page.");
            });
    },
    render: function () {
        var cocktails = this.state.data.map(function(cocktail) {
            return (
                <CocktailButton key={cocktail.id} cocktail={cocktail} />
            );
        });
        return (
            <div className="container">
                <div className="row">
                    {cocktails}
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <CocktailGrid url="/cocktails" />, document.getElementById('content')
);