import React, { useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native'

type TouchableSelectorProps = {
  options: any[]
  onSelect: (key: any, value: any) => void
  selected?: any
  selectionKey: any
}

export function TouchableSelector({ options, onSelect, selected, selectionKey}: TouchableSelectorProps) {
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
        <Text style={styles.selectorText}>
          {selected ? selected.name : 'Select weapon'}
        </Text>
        {selected && (
          <>
            <Text style={styles.detailsText}>
              Category: {selected.category} 
            </Text>
            <Text style={styles.detailsText}>
              Penetration: {selected.penetration}
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
                  <Text style={styles.optionText}>{item.name}</Text>
                  <Text style={styles.optionDetails}>Category: {item.category}, Penetration: {item.penetration}</Text>
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
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#1e1f21',
  },
  selectorText: {
    color: '#ffe900',
    fontSize: 16,
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
    fontSize: 16,
  },
  optionDetails: {
    color: '#aaa',
    fontSize: 12,
  },
})