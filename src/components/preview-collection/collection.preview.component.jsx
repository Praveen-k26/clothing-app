import React from "react";

import CollectionItem from "../collection-item/collection-item.component";

import './collection-preview.styles.scss';
import {selectCollections} from "../../redux/shop/shop.selector";
import {createStructuredSelector} from "reselect";
import connect from "react-redux/lib/connect/connect";
const CollectionPreview = ({title, items}) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {
                items
                    .filter((item, idx) => idx < 4)
                    .map(item=> (
                    <CollectionItem key={item.id} item={item}/>
                ))
            }
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
})

export default connect(mapStateToProps)(CollectionPreview);