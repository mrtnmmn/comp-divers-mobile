import { Stratagem } from '@/interfaces/Stratagem'
import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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

  const isSelected = (item: Stratagem) =>
    selected.some((stratagem) => stratagem.uuid === item.uuid)

  return (
    <>
      <TouchableOpacity style={styles.selector} onPress={() => setIsVisible(true)}>
        {selected.length > 0 ? (
          selected.map((item) => (
            <View key={item.uuid} style={styles.selectedItem}>
              <Text style={styles.selectorText}>{item.name}</Text>
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
                      <View>
                        <Text style={styles.optionText}>{item.name}</Text>
                        <Text style={styles.optionDetails}>
                          Category: {item.category}
                        </Text>
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
    flexDirection: 'row',
    gap: 8,
  },
  selectedItem: {
    marginRight: 10,
    marginBottom: 5,
  },
  selectorText: {
    color: '#ffe900',
    fontSize: 14,
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