import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { colors, fonts, radius, spacing } from '../theme';
import type { Coordinates } from '../types';
import { Card } from './Card';

type Props = {
  location: Coordinates | null;
  permissionGranted: boolean;
  height?: number;
  interactive?: boolean;
};

export function MapPreview({
  location,
  permissionGranted,
  height = 160,
  interactive = false,
}: Props) {
  if (!permissionGranted || !location) {
    return (
      <Card style={[styles.placeholder, { height }]}>
        <Text style={styles.placeholderTitle}>Map preview</Text>
        <Text style={styles.placeholderBody}>
          {permissionGranted
            ? 'Waiting for your current location…'
            : 'Allow location access to see your position on the map.'}
        </Text>
      </Card>
    );
  }

  return (
    <View style={[styles.mapWrap, { height }]}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_DEFAULT}
        scrollEnabled={interactive}
        zoomEnabled={interactive}
        pitchEnabled={false}
        rotateEnabled={false}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          pinColor={colors.mapPin}
          title="You are here"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapWrap: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.creamDark,
  },
  placeholderTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.charcoal,
  },
  placeholderBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.charcoalSoft,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
});
