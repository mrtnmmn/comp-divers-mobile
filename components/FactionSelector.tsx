import { Faction } from '@/interfaces/Faction';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FactionSelectorProps {
  options: Faction[]
  onSelect: (values: Faction[]) => void
}

export function FactionSelector({ options, onSelect }: FactionSelectorProps) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const handleSelect = (index: number) => {
    setSelectedIndices(prev => {
      const alreadySelected = prev.includes(index);
      const updated = alreadySelected
        ? prev.filter(i => i !== index)
        : [...prev, index];
      onSelect(updated.map(i => options[i]));
      let aux = updated.map(i => options[i])
      return updated;
    });
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        const isSelected = selectedIndices.includes(index);

        const dynamicStyleKey = `selectedOption${option.name}` as keyof typeof styles;
        const dynamicSelectedStyle = isSelected && styles[dynamicStyleKey];

        const buttonStyle = [
          styles.option,
          index === 0 && styles.leftRounded,
          index === options.length - 1 && styles.rightRounded,
          isSelected && styles.selectedOption,
          dynamicSelectedStyle,
        ];

        const textStyle = [
          styles.optionText,
          isSelected && styles.selectedText
        ];

        return (
          <TouchableOpacity
            key={option.uuid}
            style={buttonStyle}
            onPress={() => handleSelect(index)}
          >
            <Text style={textStyle}>{option.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 75,
    marginBottom: 15,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#404040',
  },
  leftRounded: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  rightRounded: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#404040',
  },
  selectedOptionBots: {
    backgroundColor: '#85000b',
  },
  selectedOptionTerminids: {
    backgroundColor: '#c77e00',
  },
  selectedOptionIlluminate: {
    backgroundColor: '#3c0085',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});