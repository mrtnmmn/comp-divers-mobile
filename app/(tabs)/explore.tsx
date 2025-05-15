import { StyleSheet, View } from 'react-native';

import { LoadoutViewer } from '@/components/LoadoutViewer';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { Loadout, LoadoutPageable } from '@/interfaces/Loadout';
import { apiFetch } from '@/utils/api';
import { useEffect, useState } from 'react';

export default function TabTwoScreen() {
  const { token } = useAuth()
  
  const [loadouts, setLoadouts] = useState<Loadout[] | null>(null)

  useEffect(() => {
    const loadData = async () => {
      if (!token) return;
      const response = await apiFetch<LoadoutPageable>('/loadouts/others', {
        method: 'GET',
        token: token,
      });
      setLoadouts(response.content);
    };
    loadData();
  }, []);
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <View style={{ gap: 8, paddingHorizontal: 0 }}>
        {loadouts?.map((item) => (
          <LoadoutViewer loadoutData={item} isSocial={true} key={item.uuid} />
        ))}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
