import React from 'react'

const AmountAndUnit = props => {
    let unit = "";
    switch (props.unit) {
        case 0:
            unit = props.metric ? "cl" : "oz";
            break;
        case 1:
            unit = "Teaspoon(s)";
            break;
        case 2:
            unit = "Item(s)";
        case 3:
            break;
        case 4:
            unit = "Dash(es) of";
    }

    let amount = "";
    if (props.amount > 0) {
        amount = props.unit === 0 && !props.metric ?
                              Math.round(props.amount * 0.338 * 10) / 10 :
                              props.amount;
    } 
    var amountAndUnit = amount + (unit.length > 0 ? " " + unit : "");

    return (
        <span>{amountAndUnit}</span>
    );
};

export default AmountAndUnit;