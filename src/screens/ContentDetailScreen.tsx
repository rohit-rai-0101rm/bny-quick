import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Share,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiCall } from '../hooks/useApiCall';
import { getContent } from '../api/contentApi';

const ContentDetailScreen = () => {
  const navigation = useNavigation();

  // Fetch content data using a custom API hook
  const {
    data: content,
    loading,
    error,
    refetch,
  } = useApiCall({ call: getContent });

  /**
   * Handles native share functionality.
   * Composes a message with title, subtitle, and image URL.
   */
  const handleShare = async content => {
    try {
      const result = await Share.share({
        title: content.title,
        message: `Check out this anime: ${content.title} - ${content.subTitle}\n\n${content.mainImage}`,
      });

      if (result.action === Share.sharedAction) {
        console.log('Shared successfully!');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Display loading spinner while fetching data
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Loading content...</Text>
      </View>
    );
  }

  // Display error state with retry button
  if (error || !content) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red', fontSize: 16, marginBottom: 12 }}>
          ❌ Failed to fetch content
        </Text>
        <TouchableOpacity style={styles.refreshBtn} onPress={refetch}>
          <Text style={styles.refreshText}>REFRESH</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Clean HTML tags and format content text
  const paragraphs = content.text
    .split(/<\/p>/i)
    .map(p => p.replace(/<\/?[^>]+(>|$)/g, '').trim())
    .filter(Boolean);

  const cleanText = paragraphs.join('\n\n');

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed-position close (X) button in top-right corner */}
      <TouchableOpacity
        style={styles.fixedCloseButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        {/* Fullscreen image at the top */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: content.mainImage }} style={styles.mainImage} />
          <Text style={styles.overlayText}>
            Only I Can Call My Dream Stupid.
          </Text>
        </View>

        {/* Card-style content details */}
        <View style={styles.card}>
          <View style={styles.row}>
            {/* Logo image */}
            <Image source={{ uri: content.logo }} style={styles.logo} />

            {/* Title and subtitle */}
            <View style={styles.meta}>
              <Text style={styles.title}>{content.title}</Text>
              <Text style={styles.subtitle}>
                {content.subTitle || 'Set sail for One Piece!'}
              </Text>
            </View>

            {/* Refresh + in-app purchase label */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.refreshBtn} onPress={refetch}>
                <Text style={styles.refreshText}>REFRESH</Text>
              </TouchableOpacity>
              <Text style={styles.inAppText}>In-App Purchase</Text>
            </View>
          </View>

          {/* Cleaned content description */}
          <Text style={styles.description}>{cleanText}</Text>
        </View>

        {/* Share button at the bottom */}
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => handleShare(content)}
        >
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: { flex: 1, backgroundColor: '#fff' },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  fixedCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#0007',
    padding: 6,
    borderRadius: 14,
    zIndex: 999,
  },
  closeText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  imageWrapper: { position: 'relative' },
  mainImage: { width: '100%', height: 300 },
  overlayText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: { width: 48, height: 48, borderRadius: 10 },
  meta: { flex: 1, marginLeft: 12 },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { color: 'gray', fontSize: 14 },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshBtn: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  refreshText: {
    color: '#007AFF',
    fontSize: 13,
    fontWeight: '600',
  },
  inAppText: {
    marginTop: 4,
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
  },
  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  shareButton: {
    backgroundColor: '#3b82f6',
    marginTop: 24,
    marginBottom: 24,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ContentDetailScreen;
