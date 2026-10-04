import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { ContactCard } from '../../components/ContactCard';
import { ContactForm } from '../../components/ContactForm';
import { Screen } from '../../components/Screen';
import { confirmAction } from '../../services/dialog';
import { useContactsStore } from '../../store/useAppStore';
import type { TrustedContact } from '../../types';
import { colors, fonts, spacing } from '../../theme';

export default function ContactsScreen() {
  const contacts = useContactsStore((s) => s.contacts);
  const addContact = useContactsStore((s) => s.addContact);
  const updateContact = useContactsStore((s) => s.updateContact);
  const deleteContact = useContactsStore((s) => s.deleteContact);
  const [editing, setEditing] = useState<TrustedContact | null>(null);
  const [adding, setAdding] = useState(false);

  const handleDelete = useCallback(
    (contact: TrustedContact) => {
      confirmAction('Delete contact', `Remove ${contact.name}?`, 'Delete', () => {
        void deleteContact(contact.id);
      }, true);
    },
    [deleteContact]
  );

  return (
    <Screen scroll contentStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Trusted contacts</Text>
        <Text style={styles.subtitle}>
          These people receive your emergency SMS when SOS activates.
        </Text>
      </View>

      {adding || editing ? (
        <ContactForm
          key={editing?.id ?? 'new'}
          initial={editing}
          submitLabel={editing ? 'Update contact' : 'Add contact'}
          onCancel={() => {
            setAdding(false);
            setEditing(null);
          }}
          onSubmit={(draft) => {
            if (editing) {
              void updateContact(editing.id, draft);
            } else {
              void addContact(draft);
            }
            setAdding(false);
            setEditing(null);
          }}
        />
      ) : (
        <Button label="Add contact" onPress={() => setAdding(true)} />
      )}

      <View style={styles.list}>
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 30,
    color: colors.charcoal,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.charcoalMuted,
  },
  list: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
});
