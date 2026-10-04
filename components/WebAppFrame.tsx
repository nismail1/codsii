import { ReactNode } from 'react';
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native';
import { colors } from '../theme';

const PHONE_WIDTH = 430;

type Props = {
  children: ReactNode;
};

/**
 * On a phone browser the app fills the screen.
 * On a wide desktop window it stays phone-width so testers see the mobile layout.
 */
export function WebAppFrame({ children }: Props) {
  const { width, height } = useWindowDimensions();

  if (Platform.OS !== 'web') {
    return <View style={styles.native}>{children}</View>;
  }

  const framed = width >= 900 && height >= 700;

  return (
    <View style={[styles.canvas, framed ? styles.canvasFramed : styles.canvasFull]}>
      <View style={[styles.app, framed ? styles.appFramed : styles.appFull]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  native: {
    flex: 1,
  },
  canvas: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.cream,
  },
  canvasFull: {
    alignItems: 'stretch',
  },
  canvasFramed: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E4DFD4',
  },
  app: {
    flex: 1,
    backgroundColor: colors.cream,
    overflow: 'hidden',
  },
  appFull: {
    width: '100%',
    alignSelf: 'stretch',
  },
  appFramed: {
    width: PHONE_WIDTH,
    maxWidth: '100%',
    maxHeight: 900,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#DDD6C8',
    boxShadow: '0 18px 32px rgba(28, 26, 23, 0.12)',
  },
});
