import { Colors } from '@/constants/Colors';
import { Loadout } from '@/interfaces/Loadout';
import { capitalize } from '@/utils/Format';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from './ui/IconSymbol';

interface LoadoutViewerProps {
  loadoutData: Loadout
}

export function LoadoutViewer({ loadoutData }: LoadoutViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const factionName = loadoutData.faction?.name;

  if (!factionName) {
    console.warn('Loadout is missing faction:', loadoutData);
  }

  return (
    <ThemedView
      style={[
        styles.mainLoadoutView,
        factionName ? styles[factionName as keyof typeof styles] : null,
      ]}
    >
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <ThemedText type="subtitle">{capitalize(loadoutData.name)}</ThemedText>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />
      </TouchableOpacity>

      {isOpen && (
        <ThemedView style={styles.content}>
          {loadoutData.description && (
            <ThemedText type="defaultSemiBold" style={{color: '#7d7d7d', marginBottom: 10}}>
              {capitalize(loadoutData.description).trim()}
            </ThemedText>
          )}
          <ThemedText>{loadoutData.primaryWeapon?.name}</ThemedText>
          <ThemedText>{loadoutData.secondaryWeapon?.name}</ThemedText>
          <ThemedText>{loadoutData.throwable?.name}</ThemedText>
          <ThemedText>{loadoutData.armor?.category} - {loadoutData.armorPassive?.name}</ThemedText>
          <ThemedText>{loadoutData.booster?.name}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  mainLoadoutView: {
    margin: 1,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#202020',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#303030'
  },
  content: {
    marginTop: 6,
    marginLeft: 10,
    backgroundColor: '#303030'
  },
  Bots: {
    borderColor: "#202020"
  }
});
