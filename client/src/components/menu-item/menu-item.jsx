import React from 'react';
import {withRouter} from 'react-router-dom';
/*higher order component to avoid prop drilling*/ 
import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
  ContentSubtitle
} from './menu-item.styles';

const MenuItem = ({title,imageUrl,size,history,match,linkUrl}) =>
  (<MenuItemContainer
   size={size}
   onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <BackgroundImageContainer className='background-image' imageUrl={imageUrl}></BackgroundImageContainer>
    <ContentContainer>
      <ContentTitle>{title.toUpperCase()}</ContentTitle>
      <ContentSubtitle>SHOP NOW</ContentSubtitle>
    </ContentContainer>
  </MenuItemContainer>);

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