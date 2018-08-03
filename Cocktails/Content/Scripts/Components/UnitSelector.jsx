import React from 'react';
import { connect } from 'react-redux';
import { setMetric } from '../Actions.jsx';

const UnitSelector = (props) => {
    var ozChecked = !props.metric ? "checked" : "";
    var clChecked = props.metric ? "checked" : "";

    return (
        <div>
            <div className="form-check form-check-inline">
                <label className="form-check-label">
                    <input className="form-check-input" type="radio" name={props.name} value="oz" onChange={() => props.setMetric(false)} checked={ozChecked} /> Oz
                    </label>
            </div>
            <div className="form-check form-check-inline">
                <label className="form-check-label">
                    <input className="form-check-input" type="radio" name={props.name} value="cl" onChange={() => props.setMetric(true)} checked={clChecked} /> Cl
                    </label>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    metric: state.metric
});

const mapDispatchToProps = (dispatch) => ({
    setMetric: (bool) => dispatch(setMetric(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(UnitSelector);