import { Loadout } from '@/interfaces/Loadout';
import formatDate from '@/utils/Dates';
import { capitalize } from '@/utils/Format';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BoosterIcon } from './BoosterIcon';
import { FactionIcon } from './FactionIcon';
import { PrimaryIcon } from './PrimaryIcon';
import { SecondaryIcon } from './SecondaryIcon';
import { StratagemIcon } from './StratagemIcon';
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ThrowableIcon } from './ThrowableIcon';

interface LoadoutViewerProps {
  loadoutData: Loadout,
  isSocial: boolean
}

export function LoadoutViewer({ loadoutData, isSocial }: LoadoutViewerProps) {
  const [likedByUser, setLikedByUser] = useState<boolean>(false)


  return (
    <ThemedView
      style={[
        styles.mainLoadoutView,
      ]}
    >
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <FactionIcon factionId='9e3e0edf-2822-4863-a697-c2083cd5d2ef' iconWidth={20} iconHeight={20} />
          <ThemedText type='subtitle' style={{color: '#ffe900', marginLeft: 5}}>{loadoutData.name}</ThemedText>
          {isSocial && <ThemedText type='subtitle' style={{color: '#606060'}}> - @{loadoutData.user.username}</ThemedText>}
        </View>
        {isSocial &&
          <ThemedText type='subtitle' style={{color: '#606060'}}>{formatDate(loadoutData.creationDate)}</ThemedText>
        }
      </View>
      <ThemedView style={styles.content}>
        {loadoutData.description && (
          <ThemedText type="defaultSemiBold" style={{color: '#7d7d7d', marginBottom: 10}}>
            {capitalize(loadoutData.description).trim()}
          </ThemedText>
        )}
        
        <PrimaryIcon primaryId={loadoutData.primaryWeapon.uuid} iconHeight={100} iconWidth={100} />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '62%' }}>
            <SecondaryIcon secondaryId={loadoutData.secondaryWeapon.uuid} iconHeight={150} iconWidth={100} />
          </View>
          <View style={{ width: '33%' }}>
            <ThrowableIcon throwableId={loadoutData.throwable.uuid} iconHeight={150} iconWidth={100} />
          </View>
        </View>
        <ThemedText type='subtitle' style={{color: '#ffe900'}}>Armor: </ThemedText>
        <ThemedText>{capitalize(loadoutData.armor?.category)} - {capitalize(loadoutData.armorPassive?.name)}</ThemedText>

        <View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginVertical: 10, gap: 5 }}>
          {
            loadoutData.stratagems?.map((stratagem) => (
              <View style={{display: 'flex', flexDirection: 'row'}} key={stratagem.uuid}>
              <StratagemIcon stratagemId={stratagem.uuid} stratagemType={stratagem.stratagemType} iconWidth={50} iconHeight={50}/>
              {/*
              <View style={{marginLeft: 10}}>
                <ThemedText type='defaultSemiBold' style={{color: '#ffe900'}}>{stratagem.name}</ThemedText>
                <ThemedText type='defaultSemiBold' style={{color: '#606060', flexWrap: 'wrap'}}>{stratagem.category}</ThemedText>
              </View>
              */}
            </View>
            ))
          }
        <BoosterIcon boosterId={loadoutData.booster.uuid} iconHeight={60} iconWidth={60} />
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
    marginHorizontal: 10,
  },
  Bots: {
    borderColor: "#202020"
  }
});
