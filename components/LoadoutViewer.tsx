import { Loadout } from '@/interfaces/Loadout';
import { capitalize } from '@/utils/Format';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface LoadoutViewerProps {
  loadoutData: Loadout,
  isSocial: boolean
}

export function LoadoutViewer({ loadoutData, isSocial }: LoadoutViewerProps) {
  const factionName = loadoutData.faction?.name;

  const [likedByUser, setLikedByUser] = useState<boolean>(false)

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
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <ThemedText type='subtitle' style={{color: '#ffe900'}}>{loadoutData.name}</ThemedText>
          {isSocial && <ThemedText type='subtitle' style={{color: '#606060'}}> - @{loadoutData.user.username}</ThemedText>}
        </View>
        {isSocial &&
          <Pressable onPress={() => {setLikedByUser(!likedByUser)}}>
            <FontAwesome name="thumbs-up" size={25} color={likedByUser ? '#107a00' : '#8a8a8a'}/>
          </Pressable>
        }
      </View>
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
