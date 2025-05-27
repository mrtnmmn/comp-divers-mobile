import React, { useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SecondaryIcon } from './SecondaryIcon'
import { ThemedText } from './ThemedText'

type TouchableSelectorProps = {
  options: any[]
  onSelect: (key: any, value: any) => void
  selected?: any
  selectionKey: any
}

export function SecondarySelector({ options, onSelect, selected, selectionKey}: TouchableSelectorProps) {
  const [isVisible, setIsVisible] = useState(false)

  const handleSelect = (selection: any) => {
    onSelect(selectionKey, selection)
    setIsVisible(false)
  }

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsVisible(true)}
      >
        <ThemedText type='subtitle' style={[styles.selectorText, (selected === null || selected === undefined || selected === '')  && {marginBottom: 12}]}>
          {selected ? selected.name : 'Select secondary'}
        </ThemedText>
        {selected && (
          <>
            <Text style={styles.optionDetails}>Category: {selected.category}, Penetration: {selected.penetration}</Text>
            <SecondaryIcon secondaryId={ selected.uuid } iconHeight={200} iconWidth={100} />
          </>
        )}
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.backdrop}
          onPress={() => setIsVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.drawer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.uuid}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <ThemedText type='subtitle' style={styles.optionText}>{item.name}</ThemedText>
                  <Text style={styles.optionDetails}>Category: {item.category}, Penetration: {item.penetration}</Text>
                  <SecondaryIcon secondaryId={item.uuid} iconHeight={200} iconWidth={100}/>
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  selector: {
    borderWidth: 1,
    borderColor: '#ffe900',
    borderRadius: 6,
    paddingTop: 12,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: '#1e1f21',
  },
  selectorText: {
    color: '#ffe900',
  },
  detailsText: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  drawer: {
    backgroundColor: '#1e1f21',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '60%',
  },
  option: {
    paddingVertical: 12,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  optionText: {
    color: '#ffe900',
  },
  optionDetails: {
    color: '#aaa',
    fontSize: 12,
  },
})