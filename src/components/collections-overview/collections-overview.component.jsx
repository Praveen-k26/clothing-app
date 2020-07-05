import React from "react";

import CollectionPreview from "../preview-collection/collection.preview.component";
import {selectCollections, selectCollectionsForPreview} from "../../redux/shop/shop.selector";
import {createStructuredSelector} from "reselect";
import { connect } from 'react-redux';


import './collections-overview.styles.scss';

const CollectionsOverview = ({collections}) => (
    <div className='collections-overview'>
        {collections.map(({ id, ...otherCollectionProps }) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview)


