import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import {Input, Text} from 'react-native-elements';
import I18n from '../../i18n';

class LoginScreen extends Component {
  state = {email: '', password: ''};

  loginEmail = () => {
    const {email, password} = this.state;
    this.props.actions.loginRequest(email, password);
  };

  render() {
    const {email, password} = this.state;

    return (
      <SafeAreaView>
        <ScrollView bounces={false}>
          <KeyboardAvoidingView behavior={'height'} style={styles.container}>
            <View style={styles.container}>
              <View style={styles.boxFrom}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/logo-trans.png')}
                />
                <View style={styles.input}>
                  <Input
                    inputStyle={styles.input}
                    placeholder={I18n.t('input.title.username')}
                    inputContainerStyle={styles.input}
                    onChangeText={email => this.setState({email})}
                    value={email}
                    leftIcon={{
                      type: 'font-awesome',
                      name: 'envelope',
                    }}
                  />

                  <Input
                    secureTextEntry={true}
                    // inputStyle={styles.input}
                    inputContainerStyle={styles.input}
                    placeholder={I18n.t('input.title.password')}
                    errorMessage=""
                    onChangeText={password => this.setState({password})}
                    value={password}
                    leftIcon={{
                      type: 'font-awesome',
                      name: 'unlock-alt',
                    }}
                  />
                </View>

                <View style={styles.GLogin}>
                  <TouchableOpacity onPress={this.loginEmail}>
                    <LinearGradient
                      colors={['rgba(34,193,195,1)', 'rgba(45,46,253,1)']}
                      style={styles.linearGradient}>
                      <Text style={styles.btnLogin}> LOGIN </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.loginEmail}>
                    <Image
                      style={styles.btnLoginFaceID}
                      onPress={this.loginEmail}
                      source={require('../../assets/Login/icon-face-id.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.regsiter}>
                <TouchableOpacity onPress={Actions.register}>
                  <Text style={styles.regsiterTitle}>
                    {I18n.t('login.regsiter').toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  GLogin: {
    flexDirection: 'row',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: 200,
  },
  btnLogin: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: windowWidth * 0.7,
  },
  logo: {
    height: 100,
    width: 200,
    resizeMode: 'contain',
  },
  btnLoginFaceID: {
    left: 20,
    height: 50,
    width: 50,
  },
  boxFrom: {
    height: windowHeight * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  bg: {
    width: windowWidth,
    height: windowHeight,
  },
  regsiterTitle: {
    color: 'blue',
    fontSize: 20,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

function mapStateToProps(state) {
  const {user} = state;

  return {
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
