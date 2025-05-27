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
        
        <ThemedText type='subtitle' style={{color: '#ffe900'}}>Primary: </ThemedText>
        <PrimaryIcon primaryId={loadoutData.primaryWeapon.uuid} iconHeight={100} iconWidth={100} />
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{marginLeft: 10}}>
            <ThemedText type='subtitle' style={{color: '#ffe900'}}>{loadoutData.primaryWeapon?.name}</ThemedText>
            <ThemedText type='defaultSemiBold' style={{color: '#606060'}}>Category: {loadoutData.primaryWeapon?.category}</ThemedText>
            <ThemedText type='defaultSemiBold' style={{color: '#606060'}}>Penetration: {loadoutData.primaryWeapon?.penetration}</ThemedText>
          </View>
        </View>

        <ThemedText type='subtitle' style={{color: '#ffe900'}}>Secondary: </ThemedText>
        <SecondaryIcon secondaryId={loadoutData.secondaryWeapon.uuid} iconHeight={100} iconWidth={100} />
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{marginLeft: 10}}>
            <ThemedText type='defaultSemiBold' style={{color: '#ffe900'}}>{loadoutData.secondaryWeapon?.name}</ThemedText>
            <ThemedText type='defaultSemiBold' style={{color: '#606060'}}>Category: {loadoutData.primaryWeapon?.category}</ThemedText>
            <ThemedText type='defaultSemiBold' style={{color: '#606060'}}>Penetration: {loadoutData.primaryWeapon?.penetration}</ThemedText>
          </View>
        </View>

        <ThemedText type='subtitle' style={{color: '#ffe900'}}>Throwable: </ThemedText>
        <ThrowableIcon throwableId={loadoutData.throwable.uuid} iconHeight={100} iconWidth={100} />
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{marginLeft: 10}}>
            <ThemedText type='defaultSemiBold' style={{color: '#ffe900'}}>{loadoutData.throwable?.name}</ThemedText>
            <ThemedText type='defaultSemiBold' style={{color: '#606060'}}>Category: {loadoutData.throwable?.category}</ThemedText>
            <ThemedText type='defaultSemiBold' style={{color: '#606060'}}>Penetration: {loadoutData.throwable?.penetration}</ThemedText>
          </View>
        </View>

        <ThemedText type='subtitle' style={{color: '#ffe900'}}>Armor: </ThemedText>
        <ThemedText>{capitalize(loadoutData.armor?.category)} - {capitalize(loadoutData.armorPassive?.name)}</ThemedText>

        <ThemedText type='subtitle' style={{color: '#ffe900'}}>Stratagems: </ThemedText>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
        {
          loadoutData.stratagems?.map((stratagem) => (
            <View style={{display: 'flex', flexDirection: 'row'}} key={stratagem.uuid}>
            <StratagemIcon stratagemId={stratagem.uuid} iconWidth={65} iconHeight={65}/>
            {/*
            <View style={{marginLeft: 10}}>
              <ThemedText type='defaultSemiBold' style={{color: '#ffe900'}}>{stratagem.name}</ThemedText>
              <ThemedText type='defaultSemiBold' style={{color: '#606060', flexWrap: 'wrap'}}>{stratagem.category}</ThemedText>
            </View>
            */}
          </View>
          ))
        }
        </View>

        <ThemedText type='subtitle' style={{color: '#ffe900'}}>Booster: </ThemedText>
        <BoosterIcon boosterId={loadoutData.booster.uuid} iconHeight={100} iconWidth={100} />
        <View style={{display: 'flex', flexDirection: 'row'}}>
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
    marginHorizontal: 10,
  },
  Bots: {
    borderColor: "#202020"
  }
});
