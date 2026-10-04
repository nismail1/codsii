import type { ReactNode } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../Button';
import { Card } from '../Card';
import { colors, fonts, radius, spacing } from '../../theme';
import type { DemoIncident } from '../../types/admin';
import { StatusBadge, priorityTone, statusTone } from './StatusBadge';

type Props = {
  incidents: DemoIncident[];
  onSelect: (incident: DemoIncident) => void;
};

export function IncidentTable({ incidents, onSelect }: Props) {
  return (
    <Card padded={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Active incidents</Text>
        <Text style={styles.subtitle}>Anonymized demo alerts only — no real people or exact locations.</Text>
      </View>
      {incidents.map((incident, index) => (
        <View
          key={incident.id}
          style={[styles.row, index < incidents.length - 1 && styles.rowBorder]}
          accessibilityRole="summary"
        >
          <View style={styles.main}>
            <Text style={styles.ref}>Alert {incident.referenceId}</Text>
            <Text style={styles.meta}>
              {incident.generalArea} · {incident.receivedAt}
            </Text>
            <Text style={styles.type}>{incident.alertType}</Text>
            <Text style={styles.org}>{incident.assignedOrganization}</Text>
            <View style={styles.badges}>
              <StatusBadge label={incident.status} tone={statusTone(incident.status)} />
              <StatusBadge label={incident.priority} tone={priorityTone(incident.priority)} />
            </View>
          </View>
          <Button
            label="View details"
            variant="secondary"
            onPress={() => onSelect(incident)}
            style={styles.detailBtn}
            textStyle={styles.detailBtnText}
          />
        </View>
      ))}
    </Card>
  );
}

type DetailProps = {
  incident: DemoIncident | null;
  onClose: () => void;
};

export function IncidentDetailModal({ incident, onClose }: DetailProps) {
  return (
    <Modal visible={Boolean(incident)} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close details" />
        {incident ? (
          <View style={styles.modalCard} accessibilityViewIsModal>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.demoNotice}>Prototype / Demo Data — not a live incident</Text>
              <Text style={styles.modalTitle}>Alert {incident.referenceId}</Text>
              <Text style={styles.modalSubtitle}>
                {incident.generalArea} · {incident.alertType}
              </Text>

              <Section title="Timeline">
                {incident.timeline.map((item) => (
                  <Text key={`${item.time}-${item.label}`} style={styles.listItem}>
                    {item.time} — {item.label}
                  </Text>
                ))}
              </Section>

              <Section title="General location">
                <Text style={styles.listItem}>{incident.generalArea} (area-level only)</Text>
              </Section>

              <Section title="Support requested">
                {incident.supportRequested.map((item) => (
                  <Text key={item} style={styles.listItem}>
                    • {item}
                  </Text>
                ))}
              </Section>

              <Section title="Assigned responder">
                <Text style={styles.listItem}>{incident.assignedResponder}</Text>
              </Section>

              <Section title="Status updates">
                {incident.statusUpdates.map((item) => (
                  <Text key={item} style={styles.listItem}>
                    • {item}
                  </Text>
                ))}
              </Section>

              <Section title="Follow-up required">
                <Text style={styles.listItem}>{incident.followUpRequired}</Text>
              </Section>

              <Button label="Close" onPress={onClose} style={{ marginTop: spacing.lg }} />
            </ScrollView>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.xs,
  },
  title: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 18,
    color: colors.charcoal,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.charcoalSoft,
    lineHeight: 18,
  },
  row: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  main: {
    gap: 4,
  },
  ref: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
    color: colors.charcoal,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.charcoalSoft,
  },
  type: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.charcoalMuted,
    marginTop: 4,
  },
  org: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.charcoalMuted,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  detailBtn: {
    alignSelf: 'flex-start',
    minHeight: 44,
  },
  detailBtnText: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  modalCard: {
    backgroundColor: colors.creamLight,
    borderRadius: radius.xl,
    padding: spacing.xl,
    maxHeight: '88%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  demoNotice: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.coral,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  modalTitle: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: colors.charcoal,
  },
  modalSubtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.charcoalMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: colors.charcoal,
  },
  listItem: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.charcoalMuted,
  },
});
