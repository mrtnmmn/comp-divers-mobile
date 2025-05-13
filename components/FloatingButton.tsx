import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

const FloatingButton = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {router.push('/loadoutCreator')}}
        style={styles.button}
      >
        <ThemedText style={{fontSize: 25, fontWeight: '900', color: '#000'}}>+</ThemedText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 100,
    marginBottom: 75
  },
  button: {
    backgroundColor: '#ffe900',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
  }
})

export default FloatingButton