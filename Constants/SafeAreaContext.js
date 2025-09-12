import {Platform, NativeModules} from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {scalableheight} from '../Utilities/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const {height, width} = useSafeAreaFrame();
const {top, bottom} = useSafeAreaInsets();

export var Safeareacontext = {
  top: Platform.OS == 'ios' ?  top : getStatusBarHeight(),
  bottom: bottom,
};
