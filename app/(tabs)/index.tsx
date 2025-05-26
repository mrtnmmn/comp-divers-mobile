import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
      return;
    }

    const fetchLoadouts = async () => {
      setLoading(true);
      const response = await apiFetch<Loadout[]>('/loadouts', {
        method: 'GET',
        token,
      });
      setLoadouts(response);
      setLoading(false);
    };

    fetchLoadouts();
  }, [token]);

  if (!token) return null;

  const renderParallaxWrapper = (children: React.ReactNode) => (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/helldivers2.svg')}
          style={styles.reactLogo}
        />
      }
    >
      {children}
    </ParallaxScrollView>
  );

  const renderLoading = () => (
    <View style={styles.flexContainer}>
      {renderParallaxWrapper(
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ffe900" />
        </View>
      )}
      <FloatingButton />
    </View>
  );

  const renderContent = () => (
    <View style={styles.flexContainer}>
      {renderParallaxWrapper(
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.titleText}>
              Welcome back soldier!
            </ThemedText>
          </ThemedView>

          <View style={styles.loadoutList}>
            {loadouts?.map((item) => (
              <LoadoutViewer key={item.uuid} loadoutData={item} isSocial={false} />
            ))}
          </View>
        </>
      )}
      <FloatingButton />
    </View>
  );

  return loading ? renderLoading() : renderContent();
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    color: '#ffe900',
    marginLeft: 25,
  },
  loadoutList: {
    gap: 8,
    paddingHorizontal: 0,
  },
  reactLogo: {
    height: 270,
    width: 270,
    bottom: -30,
    left: -30,
    position: 'absolute',
    transform: [{ rotate: '25deg' }],
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});