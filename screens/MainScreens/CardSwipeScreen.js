import React from 'react';

import Profiles from '../../components/CardsUI/Profiles';

const profiles = [
  {
    id: '1',
    name: 'Steve',
    age: 24,
    profile: require('../../assets/profiles/1.jpg'),
  },
  {
    id: '2',
    name: 'Jack',
    age: 30,
    profile: require('../../assets/profiles/2.jpg'),
  },
  {
    id: '3',
    name: 'Pavel',
    age: 21,
    profile: require('../../assets/profiles/3.jpg'),
  },
  {
    id: '4',
    name: 'Caroline',
    age: 28,
    profile: require('../../assets/profiles/4.jpg'),
  },
  {
    id: '5',
    name: 'Warrior',
    age: 28,
    profile: require('../../assets/profiles/5.jpg'),
  },
  {
    id: '6',
    name: 'Just man',
    age: 28,
    profile: require('../../assets/profiles/6.jpg'),
  },
];

function CardSwipeScreen() {
  return <Profiles {...{profiles}} />;
}

export default CardSwipeScreen;
