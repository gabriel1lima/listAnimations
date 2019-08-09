/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Reactotron from 'reactotron-react-native';

if (__DEV__) {
    console.tron = Reactotron
    .configure({ host: '192.168.111.21' })
    .useReactNative()
    .connect();
}
// FIXME: Resolver depois
YellowBox.ignoreWarnings( [ 'Require cycle:', 'componentWillReceiveProps'] );

AppRegistry.registerComponent(appName, () => App);
