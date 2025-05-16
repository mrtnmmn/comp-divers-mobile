import OrbitalRailcannonStrike from '@/assets/images/stratagems/orbital_railcannon_strike.svg';
import { Loadout } from '@/interfaces/Loadout';
import { capitalize } from '@/utils/Format';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { StratagemIcon } from './StratagemIcon';
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
        
        <ThemedText type='subtitle' style={{color: '#ffe900'}}>Primary: </ThemedText>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <OrbitalRailcannonStrike width={70} height={70} />
          <View style={{marginLeft: 10}}>
            <ThemedText type='subtitle' style={{color: '#ffe900'}}>{loadoutData.primaryWeapon?.name}</ThemedText>
            <ThemedText type='defaultSemiBold' style={{color: '#606060'}}>Category: {loadoutData.primaryWeapon?.category}</ThemedText>
            <ThemedText type='defaultSemiBold' style={{color: '#606060'}}>Penetration: {loadoutData.primaryWeapon?.penetration}</ThemedText>
          </View>
        </View>

        <ThemedText type='subtitle' style={{color: '#ffe900'}}>Secondary: </ThemedText>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <OrbitalRailcannonStrike width={70} height={70} />
          <View style={{marginLeft: 10}}>
            <ThemedText type='defaultSemiBold' style={{color: '#ffe900'}}>{loadoutData.secondaryWeapon?.name}</ThemedText>
            <ThemedText type='defaultSemiBold' style={{color: '#606060'}}>Category: {loadoutData.primaryWeapon?.category}</ThemedText>
            <ThemedText type='defaultSemiBold' style={{color: '#606060'}}>Penetration: {loadoutData.primaryWeapon?.penetration}</ThemedText>
          </View>
        </View>

        <ThemedText type='subtitle' style={{color: '#ffe900'}}>Throwable: </ThemedText>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <OrbitalRailcannonStrike width={70} height={70} />
          <View style={{marginLeft: 10}}>
            <ThemedText type='defaultSemiBold' style={{color: '#ffe900'}}>{loadoutData.throwable?.name}</ThemedText>
            <ThemedText type='defaultSemiBold' style={{color: '#606060'}}>Category: {loadoutData.throwable?.category}</ThemedText>
            <ThemedText type='defaultSemiBold' style={{color: '#606060'}}>Penetration: {loadoutData.throwable?.penetration}</ThemedText>
          </View>
        </View>

        <ThemedText type='subtitle' style={{color: '#ffe900'}}>Armor: </ThemedText>
        <ThemedText>{capitalize(loadoutData.armor?.category)} - {capitalize(loadoutData.armorPassive?.name)}</ThemedText>

        <ThemedText type='subtitle' style={{color: '#ffe900'}}>Stratagems: </ThemedText>
        {
          loadoutData.stratagems?.map((stratagem) => (
            <View style={{display: 'flex', flexDirection: 'row'}}>
            r<StratagemIcon stratagemId={stratagem.uuid} />
            <View style={{marginLeft: 10}}>
              <ThemedText type='defaultSemiBold' style={{color: '#ffe900'}}>{stratagem.name}</ThemedText>
              <ThemedText type='defaultSemiBold' style={{color: '#606060', flexWrap: 'wrap'}}>{stratagem.category}</ThemedText>
            </View>
          </View>
          ))
        }

        <ThemedText type='subtitle' style={{color: '#ffe900'}}>Booster: </ThemedText>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <OrbitalRailcannonStrike width={70} height={70} />
          <View style={{marginLeft: 10}}>
            <ThemedText type='defaultSemiBold' style={{color: '#ffe900'}}>{loadoutData.booster?.name}</ThemedText>
            <ThemedText type='defaultSemiBold' style={{color: '#606060', flexWrap: 'wrap'}}>{loadoutData.booster?.description}</ThemedText>
          </View>
        </View>
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
