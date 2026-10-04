import { Alert, Platform } from 'react-native';

function webMessage(title: string, message?: string): string {
  return message ? `${title}\n\n${message}` : title;
}

/** React Native Web's Alert.alert does nothing, so the browser needs its own prompt. */
export function notify(title: string, message?: string): void {
  if (Platform.OS === 'web') {
    window.alert(webMessage(title, message));
    return;
  }
  Alert.alert(title, message);
}

export function confirmAction(
  title: string,
  message: string,
  confirmLabel: string,
  onConfirm: () => void,
  destructive = false
): void {
  if (Platform.OS === 'web') {
    if (window.confirm(webMessage(title, message))) onConfirm();
    return;
  }

  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    { text: confirmLabel, style: destructive ? 'destructive' : 'default', onPress: onConfirm },
  ]);
}
