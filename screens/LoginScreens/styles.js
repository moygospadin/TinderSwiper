import {StyleSheet} from 'react-native';
export const LoginMainScreenStyles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#222325', justifyContent: 'center'},
  contentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.3,
  },
  textInput: {
    width: '87%',
    height: 48,
    backgroundColor: '#3f4042',
    borderRadius: 6,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
    color: '#e5e5e5',
    paddingLeft: 20,
    marginBottom: 10,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
});
