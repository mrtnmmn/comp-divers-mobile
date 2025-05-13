import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';

import { LoadoutViewer } from '@/components/LoadoutViewer';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { Loadout } from '@/interfaces/Loadout';
import { apiFetch } from '@/utils/api';
import { Button } from '@react-navigation/elements';

export default function HomeScreen() {
  const { token, logout } = useAuth();
  const router = useRouter();

  const [loadouts, setLoadouts] = useState<Loadout[] | null>(null) 

  useEffect(() => {
    const loadData = async () => {

      if(!token) { 
        return;
      }

      const response = await apiFetch<Loadout[]>('/loadouts', {
        method: 'GET',
        token: token
      });

      setLoadouts(response)
    }
    loadData()
  }, [])

  useEffect(() => {
    console.log("Loadouts: " , loadouts)
  }, [loadouts])

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token]);

  if (!token) return null;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <FloatingButton />
        <ThemedText type="title">Welcome back soldier!</ThemedText>
      </ThemedView>

      {loadouts !== null &&
        <FlatList
          data={loadouts}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => (
            <LoadoutViewer loadoutData={item} />
          )}
        />
      }

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <Button onPress={handleLogout}>Button</Button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});