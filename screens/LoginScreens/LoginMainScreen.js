import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {LoginMainScreenStyles as styles} from './styles';
import {confirmLogin} from '../../store/login/actions';
import {useState} from 'react';
function LoginMainScreen({confirmLogin}) {
  const [loginValues, setLoginValues] = useState({mail: '', password: ''});
  const onChangeTextHandler = (field, value) => {
    setLoginValues((prev) => {
      return {...prev, [field]: value};
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.textBold}>Залогинься</Text>
        <TextInput
          style={styles.textInput}
          value={loginValues.mail}
          onChangeText={(text) => onChangeTextHandler('mail', text)}
        />
        <TextInput
          style={styles.textInput}
          value={loginValues.password}
          onChangeText={(text) => onChangeTextHandler('password', text)}
        />
        <TouchableOpacity
          onPress={() => {
            confirmLogin(loginValues);
          }}>
          <Text style={styles.textBold}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  confirmLogin: (value) => dispatch(confirmLogin(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginMainScreen);
