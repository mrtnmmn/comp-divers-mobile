import { capitalize } from '@/utils/Format';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryIcon } from '../PrimaryIcon';
import { SecondaryIcon } from '../SecondaryIcon';
import { ThemedText } from '../ThemedText';
import { TouchableSelector } from './TouchableSelector';

type ItemType = 'primaryWeapon' | 'secondaryWeapon' | 'armor' | 'armorPassive' | 'throwable' | 'stratagems' | 'booster';

type TouchableSelectorFactoryProps = {
  data: any[]
  selectedItem: any
  type: ItemType
  value: any
  handleChange: (key: any, value: any) => void
}

export const TouchableSelectorFactory = ({ data, selectedItem, type, value, handleChange }: TouchableSelectorFactoryProps) => {

  const selectedTouchableContent = () => {
    switch (type) {
      case 'primaryWeapon': 
        return (
          <View>
            <Text style={styles.optionDetails}>Category: {selectedItem.category}, Penetration: {selectedItem.penetration}</Text>
            <PrimaryIcon primaryId={ selectedItem.uuid } iconHeight={100} iconWidth={100} />
          </View>
        )
      case 'secondaryWeapon': 
        return (
          <View>
            <Text style={styles.optionDetails}>Category: {selectedItem.category}, Penetration: {selectedItem.penetration}</Text>
            <SecondaryIcon secondaryId={ selectedItem.uuid } iconHeight={200} iconWidth={100} />
          </View>
        )
      case 'armor':
        return (
          <View>
            <Text style={styles.optionDetails}>
              Stats: {selectedItem.armor} | {selectedItem.speed} | {selectedItem.stamina} 
            </Text>
          </View>
        )
      default:
        return null
    }
  }

  const selectionContent = (item: any) => {
    switch (type) {
      case 'primaryWeapon': 
        return (
          <View>
            <Text style={styles.optionText}>{item.name}</Text>
            <Text style={styles.optionDetails}>Category: {item.category}, Penetration: {item.penetration}</Text>
          </View>
        )
      case 'secondaryWeapon':
        return (
          <View>
            <ThemedText type='subtitle' style={styles.optionText}>{item.name}</ThemedText>
            <Text style={styles.optionDetails}>Category: {item.category}, Penetration: {item.penetration}</Text>
            <SecondaryIcon secondaryId={item.uuid} iconHeight={200} iconWidth={100}/>
          </View>
        )
        case 'armor':
          return (
            <View>
              <Text style={styles.optionText}>{capitalize(item.category)}</Text>
              <Text style={styles.optionDetails}>Stats: {item.armor} | {item.speed} | {item.stamina} </Text>
            </View>
          )
      default: 
        return(
          <></>
        )
    }
  }

  return (
    <TouchableSelector
      options={data !== null ? data : []}
      selected={selectedItem}
      onSelect={handleChange}
      selectionKey={type}
      SelectedContent={selectedTouchableContent}
      selectionContent={selectionContent}
    />
  )
}

const styles = StyleSheet.create({
  optionText: {
    color: '#ffe900',
    fontSize: 16,
  },
  optionDetails: {
    color: '#aaa',
    fontSize: 12,
  },
})