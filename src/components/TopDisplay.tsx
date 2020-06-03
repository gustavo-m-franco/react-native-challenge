import React, { PropsWithChildren } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  PanResponderInstance,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import { colors } from '../assets';
import { images } from '../assets/images';
import Balance from './Balance';
import PlusIcon from '../assets/icons/PlusIcon';
import RefreshIcon from '../assets/icons/RefreshIcon';
import { Screen } from '../App';

export class TopDisplay extends React.Component<
  PropsWithChildren<ITopDisplayProps>,
  ITopDisplayState
> {
  private panResponder: PanResponderInstance;
  constructor(props: ITopDisplayProps) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      scaleX: new Animated.Value(1),
      scaleY: new Animated.Value(1),
    };
    const panMover = Animated.event([
      null,
      {
        dy: this.state.pan.y,
      },
    ]);
    const maxDrag = 170;
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 0,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy < 0 || gesture.dy > maxDrag) {
          return false;
        }
        this.state.scaleX.setValue(1 + gesture.dy / maxDrag);
        this.state.scaleY.setValue(1 + gesture.dy / maxDrag);
        // tslint:disable-next-line: no-void-expression
        return panMover(_, gesture);
      },
      onPanResponderRelease: (e, gesture) => {
        Animated.parallel([
          Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }),
          Animated.spring(this.state.scaleX, { toValue: 1 }),
          Animated.spring(this.state.scaleY, { toValue: 1 }),
        ]).start();
      },
    });
  }

  private onPressAdd = () => {
    const { changeScreen } = this.props;
    changeScreen(Screen.ADD_TRANSACTION_SCREEN);
  };

  public render() {
    const {
      collapsed,
      isAtTop,
      onPress,
      children,
      onPressRefresh,
      balance,
    } = this.props;
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    const { scaleX, scaleY } = this.state;
    return (
      <View style={[styles.container, collapsed && styles.collapsedContainer]}>
        <View style={styles.topLeftButtonContainer}>
          <TouchableOpacity
            testID="refresh"
            style={styles.topButton}
            onPress={onPressRefresh}
          >
            <RefreshIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.topRightButtonContainer}>
          <TouchableOpacity
            testID="add"
            style={styles.topButton}
            onPress={this.onPressAdd}
          >
            <PlusIcon />
          </TouchableOpacity>
        </View>
        <Animated.Image
          style={[
            styles.backgroundImage,
            { transform: [{ scaleX }, { scaleY }] },
          ]}
          source={images.bo}
        />
        <Animated.View
          style={[
            styles.detailsContainer,
            collapsed && styles.collapsedDetailsContainer,
            !collapsed && panStyle,
          ]}
          {...(!collapsed && isAtTop ? this.panResponder.panHandlers : {})}
        >
          <TouchableWithoutFeedback onPress={onPress}>
            <View>
              <View style={collapsed ? styles.collapsedHeader : styles.header}>
                <Text style={styles.title}>Balance</Text>
                <View style={styles.balanceContainer}>
                  <Balance
                    style={!collapsed ? styles.balance : undefined}
                    balance={balance}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {children}
        </Animated.View>
      </View>
    );
  }
}
const collapsedHeight = ifIphoneX(125, 100);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    flex: 1,
    zIndex: 0,
  },
  collapsedContainer: {
    height: collapsedHeight,
  },
  topRightButtonContainer: {
    zIndex: 100,
    top: collapsedHeight - 78,
    right: 16,
    position: 'absolute',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
  topLeftButtonContainer: {
    zIndex: 100,
    top: collapsedHeight - 78,
    left: 16,
    position: 'absolute',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
  topButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flexDirection: 'column',
    marginTop: 160,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    alignItems: 'stretch',
    paddingTop: 16,
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lineDivider,
    elevation: 15,
    shadowColor: '#rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 9,
  },
  collapsedDetailsContainer: {
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    marginTop: 0,
    height: collapsedHeight,
    borderBottomWidth: 1,
    borderBottomColor: colors.lineDivider,
    elevation: 0,
    shadowColor: '#rgba(0,0,0,0)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  backgroundImage: {
    marginTop: -15,
    marginLeft: '20%',
    width: '55%',
    height: 230,
    position: 'absolute',
  },
  balanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    height: 40,
  },
  title: {
    color: colors.textColor,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  balance: {
    fontSize: 40,
    height: 50,
    marginTop: 5,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: colors.lightGrey,
  },
  collapsedHeader: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 10,
    marginTop: collapsedHeight - 90,
    marginHorizontal: 50,
  },
});

export interface ITopDisplayProps {
  balance: number;
  collapsed: boolean;
  isAtTop: boolean;
  onPress: () => void;
  onPressRefresh: () => void;
  changeScreen: (screen: Screen) => void;
}

export interface ITopDisplayState {
  pan: Animated.ValueXY;
  scaleX: Animated.Value;
  scaleY: Animated.Value;
}

export default TopDisplay;
