import React from 'react';

export default class UnitSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var ozChecked = !this.props.metric ? "checked" : "";
        var clChecked = this.props.metric ? "checked" : "";
        return (
            <div>
                <div className="form-check form-check-inline">
                    <label className="form-check-label">
                        <input className="form-check-input" type="radio" name={this.props.name} value="oz" onClick={() => this.props.setMetric(false) } checked={ozChecked} /> Oz
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <label className="form-check-label">
                        <input className="form-check-input" type="radio" name={this.props.name} value="cl" onClick={() => this.props.setMetric(true) } checked={clChecked} /> Cl
                    </label>
                </div>
            </div>
        );
    }
}