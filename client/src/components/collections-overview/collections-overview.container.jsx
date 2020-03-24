import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
/*crruying all the functions together*/

import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner';
import CollectionsOverview from './collections-overview';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);
/*const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))*/

export default CollectionsOverviewContainer;

/*the containers don't render anything they just pass props down to components*/

/*we made this file to prevent proprties that belong to this file to pass from shop.jsx

 const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);

 <Route exact path={`${match.path}`} render={(props) =>
       <CollectionsOverviewWithSpinner isLoading={isFetchingCollections} {...props} />} />

const mapStateToProps = createStructuredSelector({
  isFetchingCollections: selectIsCollectionFetching
});*/