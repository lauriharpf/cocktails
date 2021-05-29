/*global FB*/
import React from 'react';
import { connect } from 'react-redux';
import { FaFacebookSquare } from 'react-icons/fa';

const shareOverrideOGMeta = (overrideLink, overrideTitle, overrideDescription, overrideImage) => {
    FB.ui(
        {
            method: 'share_open_graph',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
                object: {
                    'og:url': overrideLink,
                    'og:title': overrideTitle,
                    'og:description': overrideDescription,
                    'og:image': overrideImage
                }
            })
        },
        function (response) {
            // Action after response
        }
    );
};

const createDescription = (drinkList, cocktails) => {
    if (!drinkList || drinkList.size === 0) {
        return "Friends coming over for cocktails? Find tasty cocktail recipes and check what ingredients you need.";
    }

    return Array.from(drinkList.entries()).map((keyToValue) => {
        var cocktail = cocktails.find(x => x.id === keyToValue[0]);
        return keyToValue[1] + "x " + cocktail.name;
    }).join(", ");
};

const createTitle = (drinkList) => {
    return !drinkList || drinkList.size === 0 ? "Cocktails World" : "Drinks and Ingredients Needed";
};

const FacebookShare = (props) =>
    <FaFacebookSquare size="2em" color="#3b5998" style={{ cursor: "pointer" }}
        onClick={() => {
            shareOverrideOGMeta(props.shareUrl,
                createTitle(props.drinkList),
                createDescription(props.drinkList, props.cocktails),
                "http://www.cocktailsworld.eu/Images/cocktail_og_image.jpg"
            );
        }}
    />;

const mapStateToProps = state => {
    const shareUrl = "http://www.cocktailsworld.eu" + state.router.location.pathname;
    return {
        drinkList: state.app.drinkList,
        cocktails: state.app.data,
        shareUrl
    };
};

export default connect(mapStateToProps)(FacebookShare);