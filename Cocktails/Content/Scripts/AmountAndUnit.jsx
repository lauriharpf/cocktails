import React from 'react'

const AmountAndUnit = props => {
    let unit = "";
    switch (props.unit) {
        case 0:
            unit = "cl";
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

    var amount = props.amount > 0 ? props.amount : "";
    var amountAndUnit = amount + (unit.length > 0 ? " " + unit : "");

    return (
        <span>{amountAndUnit}</span>
    );
};

export default AmountAndUnit;