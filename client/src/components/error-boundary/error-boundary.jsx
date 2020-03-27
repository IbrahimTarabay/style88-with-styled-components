import React from 'react';

import {ErrorImageOverlay,ErrorImageContainer,ErrorImageText} from './error-boundary.styles';

class ErrorBoundary extends React.Component {
  constructor(){
    super();

    this.state = {
      hasErrored: false
    }
  }

  static getDerivedStateFromError(error){/*it's static lifecycle method, it catches any error that gets thrown
  in any of the children of this error boundary component*/
    return {hasErrored: true};
  }

  componentDidCatch(error,info){
    /*this method gives us access to both error and info related to error(like which component broke)*/
    console.log(error);
  }

  render(){
    if(this.state.hasErrored){
      return(
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/A040Lxr.png'/>
          <ErrorImageText>This Page is Lost in Space</ErrorImageText>
        </ErrorImageOverlay>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;