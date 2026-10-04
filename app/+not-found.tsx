import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, spacing } from '../theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found', headerShown: true }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen does not exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cream,
    padding: spacing.xl,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.charcoal,
  },
  link: {
    marginTop: spacing.lg,
  },
  linkText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.coral,
  },
});
