import { createElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius, spacing } from '../theme';
import type { Coordinates } from '../types';
import { Card } from './Card';

type Props = {
  location: Coordinates | null;
  permissionGranted: boolean;
  height?: number;
  interactive?: boolean;
};

/** Browser map. react-native-maps does not run on web. */
export function MapPreview({
  location,
  permissionGranted,
  height = 160,
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

  const pad = 0.008;
  const bbox = [
    location.longitude - pad,
    location.latitude - pad,
    location.longitude + pad,
    location.latitude + pad,
  ].join(',');
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${location.latitude}%2C${location.longitude}`;

  return (
    <View style={[styles.mapWrap, { height }]}>
      {createElement('iframe', {
        src,
        title: 'Map of your current location',
        loading: 'lazy',
        referrerPolicy: 'no-referrer-when-downgrade',
        style: {
          border: 0,
          width: '100%',
          height: '100%',
        },
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mapWrap: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.creamDark,
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
