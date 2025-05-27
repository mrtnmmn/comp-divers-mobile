import React, { useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ThemedText } from './ThemedText'
import { ThrowableIcon } from './ThrowableIcon'

type TouchableSelectorProps = {
  options: any[]
  onSelect: (key: any, value: any) => void
  selected?: any
  selectionKey: any
}

export function ThrowableSelector({ options, onSelect, selected, selectionKey}: TouchableSelectorProps) {
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
        {!selected?.name &&
          <ThemedText type='subtitle' style={[styles.selectorText]}>
            Select throwable
          </ThemedText>
        }

        {selected && (
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
            <ThrowableIcon throwableId={selected.uuid} iconHeight={100} iconWidth={100}/>
            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 10}}>
              <ThemedText type='subtitle' style={styles.optionText}>{selected.name}</ThemedText>
              <Text style={styles.optionDetails}>Category: {selected.category}</Text>
              <Text style={styles.optionDetails}>Penetration: {selected.penetration}</Text>
            </View>
          </View>
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
                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <ThrowableIcon throwableId={item.uuid} iconHeight={100} iconWidth={100}/>
                    <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 10}}>
                      <ThemedText type='subtitle' style={styles.optionText}>{item.name}</ThemedText>
                      <Text style={styles.optionDetails}>Category: {item.category}</Text>
                      <Text style={styles.optionDetails}>Penetration: {item.penetration}</Text>
                    </View>
                  </View>
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