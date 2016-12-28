var CocktailButton = React.createClass({
    render: function() {
        return (
            <div className="col-sm-4" style={{ textAlign: "center" }} data-toggle="modal" data-target={"#modal" + this.props.id}>
                <img src="/images/cocktail_no_image_extra_small.jpg" width="50" height="78" />
                <h6>{this.props.name}</h6>
                <CocktailDetails id={this.props.id} name={this.props.name} />
            </div>
        );
    }
});

var CocktailDetails = React.createClass({
    render: function() {
        return (
            <div className="modal fade" id={"modal" + this.props.id} tabIndex="-1" role="dialog" aria-labelledby={"modalLabel" + this.props.id} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id={"modalLabel" + this.props.id}>{this.props.name}</h4>
                        </div>
                        <div className="modal-body">
                            Details on the {this.props.name} cocktail..
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
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <CocktailButton id="1" name="Mai Tai" />
                    <CocktailButton id="2" name="Cosmopolitan"/>
                    <CocktailButton id="3" name="Mojito" />
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <CocktailGrid/>, document.getElementById('content')
);