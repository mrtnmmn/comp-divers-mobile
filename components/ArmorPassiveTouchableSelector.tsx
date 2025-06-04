import { ArmorPassive } from '@/interfaces/ArmorPassive'
import { capitalize } from '@/utils/Format'
import React, { useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native'

type ArmorPassiveTouchableSelectorProps = {
  options: ArmorPassive[]
  onSelect: (value: ArmorPassive) => void
  selected?: ArmorPassive | null
}

export function ArmorPassiveTouchableSelector({ options, onSelect, selected}: ArmorPassiveTouchableSelectorProps) {
  const [isVisible, setIsVisible] = useState(false)

  const handleSelect = (selection: any) => {
    onSelect(selection)
    setIsVisible(false)
  }

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsVisible(true)}
      >
        <Text style={[styles.selectorText, (selected === null || selected === undefined) && {color: '#5c5c5c'}]}>
          {selected ? capitalize(selected.name) : 'Select armor passive'}
        </Text>
        {selected && (
          <>
            <Text style={styles.detailsText}>
              {selected.category} 
            </Text>
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
                  <Text style={styles.optionText}>{capitalize(item.name)}</Text>
                  <Text style={styles.detailsText}>{item.category}</Text>
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
    borderColor: '#a3992e',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#1e1f21',
  },
  selectorText: {
    color: '#ffe900',
    fontSize: 16,
  },
  detailsText: {
    color: '#aaa',
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
    fontSize: 16,
  },
  optionDetails: {
    color: '#aaa',
    fontSize: 12,
  },
})