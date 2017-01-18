function unitToString(unit) {
    switch (unit) {
    case 0:
        return "cl";
    case 1:
        return "Teaspoon";
    }

    return "";
}

var CocktailButton = React.createClass({
    render: function() {
        return (
            <div className="col-sm-4 cocktailButton" style={{ textAlign: "center" }} data-toggle="modal" data-target={"#modal" + this.props.cocktail.ID}>
                <img src={this.props.cocktail.Image} width="50" height="78" />
                <h6>{this.props.cocktail.Name}</h6>
                <CocktailDetails cocktail={this.props.cocktail} />
            </div>
        );
    }
});

var CocktailDetails = React.createClass({
    render: function() {
        var recipeRows = this.props.cocktail.RecipeRows.map(function(recipeRow) {
            var unit = unitToString(recipeRow.Unit);
            var amount = recipeRow.Amount > 0 ? recipeRow.Amount : "";
            var amountAndUnit = amount + (unit.length > 0 ? " " + unit : "");

            return (
                <li key={recipeRow.ID}>{amountAndUnit} <span className="capitalize">{recipeRow.Ingredient.Name}</span></li>
            );
        });
        return (
            <div className="modal fade" id={"modal" + this.props.cocktail.ID} tabIndex="-1" role="dialog" aria-labelledby={"modalLabel" + this.props.cocktail.ID} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id={"modalLabel" + this.props.cocktail.ID}>{this.props.cocktail.Name}</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <img src={this.props.cocktail.Image} width="240" height="320" />
                                </div>
                                <div className="col-sm-6">
                                    <h6>Ingredients</h6>
                                    <ul>{recipeRows}</ul>

                                    <h6>Instructions</h6>
                                    {this.props.cocktail.Instructions}
                                </div>
                            </div>
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
    componentWillMount: function() {
        var component = this;

        function cocktailImageUrl(url) {
            return url ? ("/Content/Images/Drinks/" + url) : "/Content/Images/cocktail_no_image_small.jpg";
        }

        $.get(this.props.url)
            .done(function(data) {
                $(data).each((index, item) => item.Image = cocktailImageUrl(item.Image));
                component.setState({ data: data });
            })
            .fail(function() {
                alert("Sorry! Fetching cocktails went horribly wrong. Try refreshing the page.");
            });
    },
    render: function() {
        var cocktails = this.state.data.map(function(cocktail) {
            return (
                <CocktailButton key={cocktail.ID} cocktail={cocktail} />
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
    <CocktailGrid url="/api/cocktails" />, document.getElementById("content")
);