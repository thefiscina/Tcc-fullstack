import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Image, LogBox } from 'react-native';
import { StatusBar } from 'react-native';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Routes from './src/routes';
import apiBase from './src/service/api';
import { appLoaded, authenticaded, signInSuccess } from './src/store/actions';
import styles, { colors } from './src/styles';

// create a component
class AppRoot extends Component {
  constructor(props) {
    super(props);
  }


  async componentDidMount() {
    this.props.checkLogin();
  }

  render() {
    LogBox.ignoreAllLogs(true)
    const { app_started, authenticaded } = this.props.authState;
    console.log('APP INICIADO', app_started)
    console.log('autenticado', authenticaded)
    let _renderAppRoot = this._renderAppRoot(authenticaded);
    let _renderSplash = this._renderSplash(app_started);
    return app_started ? _renderAppRoot : _renderSplash;
  }

  _renderAppRoot(authenticaded) {
    const CreateRoot = Routes(authenticaded);
    return <CreateRoot />
  }

  _renderSplash(app_started) {
    return (
      <>
        <StatusBar backgroundColor={colors.background_principal} barStyle="light-content" />
        <View style={styles.splashContainer}>
          {
            app_started == false ? <Image style={styles.imageSplash} source={require('./src/assets/logos/logo_png.png')} /> : null
          }
        </View >
      </>
    )
  }

}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    async checkLogin() {
      const isLoggin = await AsyncStorage.getItem('@BPF:token').catch(e => console.log(e));
      if (isLoggin) {
        var user = await AsyncStorage.getItem('@BPF:user');
        apiBase.defaults.headers.Authorization = `bearer ${isLoggin}`;
        dispatch(signInSuccess(isLoggin, JSON.parse(user)))
        dispatch(authenticaded(true));
      }
      dispatch(appLoaded(true))
    },
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authState: state.authState
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppRoot)