import React from 'react';
import {lazy,Suspense} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'));

class ShopPage extends React.Component{
  componentDidMount(){
   const {fetchCollectionsStart} = this.props;
   fetchCollectionsStart();
  }

 render(){ 
   const {match} = this.props;
   /*we have access to match object because 
  <Route path='/shop' component={ShopPage} /> which in App.js*/
  return(
  <div className='shop-page'>
   <Suspense> 
    <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
   </Suspense>
  </div>
  );
 }
}

const mapDispatchToProps = dispatch =>({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null,mapDispatchToProps)(ShopPage);
