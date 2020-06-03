import React from 'react';
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

export class ToastComponent extends React.Component<
  IToastProps,
  { bounceValue: Animated.Value }
> {
  constructor(props: IToastProps) {
    super(props);

    // Set up slide-in animation
    const bounce = new Animated.Value(0);
    this.state = { bounceValue: bounce };
  }

  public animateNotification(show: boolean) {
    this.state.bounceValue.setValue(show ? 0 : 100);
    const toValue = show ? 100 : 0;

    // This will animate the transalteY of the subview between 0 & 100 depending on its current state
    // 100 comes from the style below, which is the height of the subview.
    Animated.timing(this.state.bounceValue, {
      toValue,
      duration: 400,
      easing: Easing.linear,
    }).start();
  }

  public componentDidUpdate(prevProps: IToastProps) {
    const { show } = this.props;
    if (show && !prevProps.show) {
      this.animateNotification(true);
    }
    show && setTimeout(this.hide, 3000);
  }

  private hide = () => {
    const { hide, show } = this.props;
    if (show) {
      this.animateNotification(false);
      hide();
    }
  };

  private getBackgroundColor = () => {
    const { type } = this.props;
    switch (type) {
      case NotificationTypes.ERROR:
        return colors.red;
      case NotificationTypes.NOTIFICATION:
        return colors.green;
      default:
        return colors.brandYellow;
    }
  };

  public render() {
    const { title, message } = this.props;
    return (
      <Animated.View
        style={[
          styles.holder,
          { transform: [{ translateY: this.state.bounceValue }] },
        ]}
      >
        <FlingGestureHandler
          direction={Directions.UP}
          onHandlerStateChange={this.hide}
        >
          <View
            style={[
              styles.container,
              { backgroundColor: this.getBackgroundColor() },
            ]}
          >
            <View style={styles.notification}>
              {title && (
                <Text onPress={this.hide} style={styles.title}>
                  {title}
                </Text>
              )}
              <Text onPress={this.hide} style={styles.text}>
                {message}
              </Text>
            </View>
            <TouchableOpacity onPress={this.hide}>
              <CloseIcon style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
        </FlingGestureHandler>
      </Animated.View>
    );
  }
}

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
