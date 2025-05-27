import { Stratagem } from '@/interfaces/Stratagem'
import { capitalize } from '@/utils/Format'
import { FontAwesome } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StratagemIcon } from './StratagemIcon'
import { ThemedText } from './ThemedText'

type StratagemSelectorProps = {
  options: Stratagem[]
  selected: Stratagem[]
  onChange: (selections: Stratagem[]) => void
  maxSelections?: number
}

export function StratagemSelector({
  options,
  selected,
  onChange,
  maxSelections = 4,
}: StratagemSelectorProps) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleSelection = (item: Stratagem) => {
    const isSelected = selected.some((stratagem) => stratagem.uuid === item.uuid)

    if (isSelected) {
      onChange(selected.filter((stratagem) => stratagem.uuid !== item.uuid))
    } else if (selected.length < maxSelections) {
      onChange([...selected, item])
    }
  }


  useEffect(() => {
  }, [options])

  const isSelected = (item: Stratagem) =>
    selected.some((stratagem) => stratagem.uuid === item.uuid)

  return (
    <>
      <TouchableOpacity style={styles.selector} onPress={() => setIsVisible(true)}>
        {selected.length > 0 ? (
          selected.map((item) => (
            <View key={item.uuid} style={styles.selectedItem}>
              <StratagemIcon stratagemId={item.uuid} iconHeight={60} iconWidth={60}/>
              <View style={{ paddingHorizontal: 12 }}>
                <ThemedText type='subtitle' style={styles.selectorText}>{item.name}</ThemedText>
                <Text style={styles.optionDetails}>{capitalize(item.category)}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.selectorText}>Select up to {maxSelections} stratagems</Text>
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
              keyExtractor={(item) => item.uuid.toString()}
              renderItem={({ item }) => {
                const isItemSelected = isSelected(item)
                const disabled = !isItemSelected && selected.length >= maxSelections

                return (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      isItemSelected && styles.optionSelected,
                      disabled && styles.optionDisabled,
                    ]}
                    onPress={() => toggleSelection(item)}
                    disabled={disabled}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
                      <View style={{ display:'flex', flexDirection: 'row' }}>
                        <StratagemIcon stratagemId={item.uuid} iconHeight={40} iconWidth={40}/>
                        <View style={{marginLeft: 10, justifyContent: 'center'}}>
                          <Text style={styles.optionText}>{item.name}</Text>
                          <Text style={styles.optionDetails}>
                            {item.category}
                          </Text>
                        </View>
                      </View>
                      {isItemSelected && <FontAwesome name="check" size={18} color="#ffe900" />}
                    </View>
                  </TouchableOpacity>
                )
              }}
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
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  selectedItem: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 10,
    marginBottom: 5,
  },
  selectorText: {
    color: '#ffe900',
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
  optionSelected: {
    backgroundColor: '#333',
  },
  optionDisabled: {
    opacity: 0.4,
  },
})