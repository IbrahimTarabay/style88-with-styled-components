import React from 'react';
import {withRouter} from 'react-router-dom';
/*higher order component to avoid prop drilling*/ 
import './menu-item.scss';

const MenuItem = ({title,imageUrl,size,history,match,linkUrl}) =>{
  return (<div className={`menu-item ${size}`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }}></div>
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>);
};

export default withRouter(MenuItem);

/*When you include a main page component in your app, it is often wrapped in a <Route> component like this:

<Route path="/movies" component={MoviesIndex} />
By doing this, the MoviesIndex component has access to this.props.history so it can redirect the user with this.props.history.push.

Some components (commonly a header component) appear on every page, so are not wrapped in a <Route>:

render() {
  return (<Header />);
}
This means the header cannot redirect the user.

To get around this problem, the header component can be wrapped in a withRouter function, either when it is exported:

export default withRouter(Header)
This gives the Header component access to this.props.history, which means the header can now redirect the user.*/