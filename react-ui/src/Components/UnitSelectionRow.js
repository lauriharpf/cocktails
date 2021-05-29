import React from 'react';
import UnitSelector from './UnitSelector';

const UnitSelectionRow = (props) => 
    <div className="clearfix">
        <div className="float-left"><b>{props.text}</b></div>
        <div className="float-right"><UnitSelector name={props.name} /></div>
    </div>;

export default UnitSelectionRow;