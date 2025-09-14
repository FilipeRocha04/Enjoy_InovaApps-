import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient
      colors={[Colors.primary, '#1a1a1a', Colors.primary]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.topLogoContainer}>
          <Image
            source={require('@/assets/images/Comunidade D.png')}
            style={styles.topLogoImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/Logo NexEnjoy.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.bottomText}>Enjoy</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  topLogoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 16,
  },
  topLogoImage: {
    width: 300,
    height: 90,
  },
  logoImage: {
    width: 220,
    height: 220,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  topText: {
    fontFamily: Typography.fonts.titleBold,
    fontSize: Typography.sizes.title,
    color: Colors.accent,
    textAlign: 'center',
    letterSpacing: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: Colors.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoText: {
    fontFamily: Typography.fonts.titleBold,
    fontSize: 48,
    color: Colors.primary,
  },
  bottomText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.lg,
    color: Colors.text.primary,
    letterSpacing: 2,
  },
});