import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import FloatingButton from '@/components/FloatingButton';
import { LoadoutViewer } from '@/components/LoadoutViewer';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { Loadout } from '@/interfaces/Loadout';
import { apiFetch } from '@/utils/api';

export default function HomeScreen() {
  const { token } = useAuth();
  const router = useRouter();

  const [loadouts, setLoadouts] = useState<Loadout[] | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!token) return;
      const response = await apiFetch<Loadout[]>('/loadouts', {
        method: 'GET',
        token: token,
      });
      setLoadouts(response);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token]);

  useEffect(() => {
    console.log(loadouts)
  }, [loadouts]);

  if (!token) return null;

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#353636' }}
        headerImage={
          <Image
            source={require('@/assets/images/helldivers2.svg')}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={{color: '#ffe900'}}>Welcome back soldier!</ThemedText>
        </ThemedView>

        <View style={{ gap: 8, paddingHorizontal: 0 }}>
          {loadouts?.map((item) => (
            <LoadoutViewer loadoutData={item} key={item.uuid} />
          ))}
        </View>
      </ParallaxScrollView>

      <FloatingButton />
    </View>
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
    height: 270,
    width: 270,
    bottom: -30,
    left: -30,
    position: 'absolute',
    transform: [{ rotate: '25deg' }],
  },
});