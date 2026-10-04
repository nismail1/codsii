import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme';

/** Soft cream atmosphere without flat fill. */
export function LinearishBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={styles.blobOne} />
      <View style={styles.blobTwo} />
      <View style={styles.blobThree} />
    </View>
  );
}

const styles = StyleSheet.create({
  blobOne: {
    position: 'absolute',
    top: -40,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: colors.coralMuted,
    opacity: 0.7,
  },
  blobTwo: {
    position: 'absolute',
    top: 180,
    left: -80,
    width: 180,
    height: 180,
    borderRadius: 180,
    backgroundColor: colors.goldMuted,
    opacity: 0.8,
  },
  blobThree: {
    position: 'absolute',
    bottom: 80,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 160,
    backgroundColor: colors.creamDark,
    opacity: 0.9,
  },
});
