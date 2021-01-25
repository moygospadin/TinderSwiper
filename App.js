import React from 'react';
import {Provider} from 'react-redux';
import {AppNavigation} from './navigation';
import {store} from './store/createStore';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};
export default App;
