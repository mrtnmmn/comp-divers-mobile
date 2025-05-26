import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { LoadoutViewer } from '@/components/LoadoutViewer';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { Loadout } from '@/interfaces/Loadout';
import { apiFetch } from '@/utils/api';

export default function TabTwoScreen() {
  const { token } = useAuth();

  const [loadouts, setLoadouts] = useState<Loadout[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchLoadouts = useCallback(async (pageToFetch: number) => {
    if (!token || loading || !hasMore) return;

    setLoading(true);
    try {
      console.log(pageToFetch)
      const response = await apiFetch<any>(`/loadouts/others?page=${pageToFetch}&size=2`, {
        method: 'GET',
        token,
      });

      setLoadouts(prev => [...prev, ...response.content]);
      setHasMore(!response.last);
      setPage(pageToFetch);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [token, loading, hasMore]);

  useEffect(() => {
    fetchLoadouts(0);
  }, [token]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchLoadouts(page + 1);
    }
  };

  const renderItem = ({ item }: { item: Loadout }) => (
    <LoadoutViewer key={item.uuid} loadoutData={item} isSocial={true} />
  );

  const renderFooter = () => (
    loading ? <ActivityIndicator size="large" color="#ffe900" style={{ margin: 16 }} /> : null
  );

  const renderParallaxWrapper = (children: React.ReactNode) => (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      {children}
    </ParallaxScrollView>
  );

  const renderContent = () => (
    <View style={styles.flexContainer}>
      {renderParallaxWrapper(
        <FlatList
          data={loadouts}
          keyExtractor={(item) => item.uuid}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.loadoutList}
        />
      )}
    </View>
  );

  const renderLoading = () => (
    <View style={styles.flexContainer}>
      {renderParallaxWrapper(
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ffe900" />
        </View>
      )}
    </View>
  );

  return initialLoading ? renderLoading() : renderContent();
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
    color: '#808080',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadoutList: {
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});