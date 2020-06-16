import React from 'react';
import LoadingBar from "react-redux-loading-bar";
import RouterManager from 'routes';

function App() {
  return (
      <React.Fragment>
          <LoadingBar className={'loading-bar'}/>
          <RouterManager/>
      </React.Fragment>
  );
}

export default App;
