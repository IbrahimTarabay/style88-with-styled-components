import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import {selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner';
import CollectionPage from './collection';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionsLoaded(state)
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;

/*the containers don't render anything they just pass props down to components*/

/*so if they are same (like in collections-overview.container)
 why we write it in extra way?
 they are NOT the same, we want to INVERT the result
const func1 = arg1=>doing something with arg1
const func2 = arg1 => !func1(arg1)*/

/*we make collection.container.jsx to replace this code in shop.jsx and make every component concern of itself
import {selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';
 const CollectionPageWithSpinner = WithSpinner(CollectionPage);

     <Route path={`${match.path}/:collectionId`}
      render={(props) =>
       <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />} />

 const mapStateToProps = createStructuredSelector({
  isCollectionsLoaded: selectIsCollectionsLoaded
});
*/