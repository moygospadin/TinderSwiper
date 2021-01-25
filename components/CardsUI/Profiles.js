import React, {useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  add,
  multiply,
  neq,
  spring,
  cond,
  eq,
  event,
  lessThan,
  greaterThan,
  and,
  call,
  set,
  clockRunning,
  startClock,
  stopClock,
  Clock,
  Value,
  concat,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

import Card from './Card';

function runSpring(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

const {width, height} = Dimensions.get('window');
const toRadians = (angle) => angle * (Math.PI / 180);
const rotatedWidth =
  width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));

function Profiles(props) {
  const [state, setState] = useState(props.profiles);
  let translateX = new Value(0);
  const translationX = useRef(new Animated.Value(0)).current;
  const velocityX = useRef(new Value(0)).current;
  const offsetX = useRef(new Value(0)).current;
  const gestureState = useRef(new Value(State.UNDETERMINED)).current;
  const onGestureEvent = useRef(
    event(
      [
        {
          nativeEvent: {
            translationX,
            velocityX,
            state: gestureState,
          },
        },
      ],
      {useNativeDriver: true},
    ),
  ).current;

  (function init() {
    console.log('init');
    const clockX = new Clock();
    gestureState.setValue(State.UNDETERMINED);
    translationX.setValue(0);
    velocityX.setValue(0);
    offsetX.setValue(0);
    const finalTranslateX = add(translationX, multiply(0.2, velocityX));
    const translationThreshold = width / 4;
    const snapPoint = cond(
      lessThan(finalTranslateX, -translationThreshold),
      -rotatedWidth,
      cond(greaterThan(finalTranslateX, translationThreshold), rotatedWidth, 0),
    );
    translateX = cond(
      eq(gestureState, State.END),
      [
        set(translationX, runSpring(clockX, translationX, snapPoint)),
        set(offsetX, translationX),
        cond(and(eq(clockRunning(clockX), 0), neq(translationX, 0)), [
          call([translationX], swipped),
        ]),
        translationX,
      ],
      cond(
        eq(gestureState, State.BEGAN),
        [stopClock(clockX), translationX],
        translationX,
      ),
    );
  })();

  function swipped([translationX]) {
    const [lastProfile, ...profiles] = state;

    console.log('lastProfile', lastProfile, {likes: translationX > 0});
    setState(profiles);
  }

  const [lastProfile, ...profiles] = state;

  const rotateZ = concat(
    interpolate(translateX, {
      inputRange: [-width / 2, width / 2],
      outputRange: [15, -15],
      extrapolate: Extrapolate.CLAMP,
    }),
    'deg',
  );
  const likeOpacity = interpolate(translateX, {
    inputRange: [0, width / 4],
    outputRange: [0, 1],
  });
  const nopeOpacity = interpolate(translateX, {
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
  });
  const style = {
    ...StyleSheet.absoluteFillObject,
    zIndex: 900,
    transform: [{translateX}, {rotateZ}],
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cards}>
        {profiles.reverse().map((profile) => (
          <Card key={profile.id} {...{profile}} />
        ))}
        <PanGestureHandler
          onHandlerStateChange={onGestureEvent}
          {...{onGestureEvent}}>
          <Animated.View {...{style}}>
            {lastProfile && (
              <Card profile={lastProfile} {...{likeOpacity, nopeOpacity}} />
            )}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </SafeAreaView>
  );
}
export default React.memo(Profiles);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfaff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  cards: {
    flex: 1,
    margin: 8,
    zIndex: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});
