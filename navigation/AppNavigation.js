import React from 'react';
import {CardSwipeScreen, LoginMainScreen} from '../screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {TransitionScreenOptions} from './TransitionScreenOptions';
const Stack = createStackNavigator();
function AppNavigation({isLogin}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginMainScreen"
        screenOptions={TransitionScreenOptions}
        headerMode="none">
        {isLogin ? (
          <Stack.Screen name="CardSwipeScreen" component={CardSwipeScreen} />
        ) : (
          <Stack.Screen name="LoginMainScreen" component={LoginMainScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function mapStateToProps(state) {
  return {
    isLogin: state.loginReducer.isLogin,
  };
}

const mapDispatch = {};

export default connect(mapStateToProps, mapDispatch)(AppNavigation);
