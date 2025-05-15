import { Loadout } from '@/interfaces/Loadout';
import { capitalize } from '@/utils/Format';
import { StyleSheet } from 'react-native';
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface LoadoutViewerProps {
  loadoutData: Loadout
}

export function LoadoutViewer({ loadoutData }: LoadoutViewerProps) {
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
      <ThemedText type='title' style={{color: '#ffe900'}}>{loadoutData.name}</ThemedText>
      <ThemedView style={styles.content}>.
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
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  content: {
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 10,
  },
  Bots: {
    borderColor: "#202020"
  }
});
