import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { FlingGestureHandler, Directions } from 'react-native-gesture-handler';

import { ifIphoneX } from 'react-native-iphone-x-helper';
import { colors } from '../assets';
import CloseIcon from '../assets/icons/CloseIcon';
import { NotificationTypes } from '../store/notification';

const ToastComponent: React.FunctionComponent<IToastProps> = ({
  show,
  type,
  hide,
  title,
  message,
}) => {
  const bounceValue = new Animated.Value(0);
  useEffect(() => {
    animateNotification(show);
  }, [show]);
  const animateNotification = (showArg: boolean) => {
    bounceValue.setValue(showArg ? 0 : 100);
    const toValue = showArg ? 100 : 0;
    // This will animate the transalteY of the subview between 0 & 100 depending on its current state
    // 100 comes from the style below, which is the height of the subview.
    Animated.timing(bounceValue, {
      toValue,
      duration: 400,
      easing: Easing.linear,
    }).start();
    showArg && setTimeout(hide, 3000);
  };

  const startHide = () => {
    if (show) {
      animateNotification(false);
      hide();
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case NotificationTypes.ERROR:
        return colors.red;
      case NotificationTypes.NOTIFICATION:
        return colors.green;
      default:
        return colors.brandYellow;
    }
  };
  return (
    <Animated.View
      style={[styles.holder, { transform: [{ translateY: bounceValue }] }]}
    >
      <FlingGestureHandler
        direction={Directions.UP}
        onHandlerStateChange={startHide}
      >
        <View
          style={[styles.container, { backgroundColor: getBackgroundColor() }]}
        >
          <View style={styles.notification}>
            {title && (
              <Text onPress={startHide} style={styles.title}>
                {title}
              </Text>
            )}
            <Text onPress={startHide} style={styles.text}>
              {message}
            </Text>
          </View>
          <TouchableOpacity onPress={startHide}>
            <CloseIcon style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      </FlingGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  holder: {
    width: '100%',
    position: 'absolute',
    zIndex: 1000,
    overflow: 'visible',
    top: -100,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notification: {
    flex: 1,
    paddingBottom: 12,
    paddingLeft: 70,
    paddingRight: 36,
    paddingTop: ifIphoneX(45, 25),
  },
  title: {
    color: colors.white,
    opacity: 1,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
  },
  text: {
    color: colors.white,
    opacity: 1,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
  closeIcon: {
    marginTop: ifIphoneX(25, 0),
    marginRight: 24,
  },
});

export interface IToastProps {
  title?: string;
  message: string;
  type: NotificationTypes;
  show: boolean;
  hide: () => void;
}

export default ToastComponent;
