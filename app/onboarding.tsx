import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Dimensions 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Rocket, Handshake, Trophy } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    title: 'Bem-vindo à Disruption',
    description: 'Uma comunidade exclusiva para empresários de alto nível compartilharem experiências e gerarem novos negócios.',
    icon: Rocket,
    color: '#b18c54',
  },
  {
    title: 'Faça Conexões',
    description: 'Conecte-se com outros membros da sua empresa e do seu segmento.\n\nExpanda sua rede de contatos profissionais.',
    icon: Handshake,
    color: '#b18c54',
  },
  {
    title: 'Ganhe Pontos',
    description:
      'O aplicativo premia o engajamento e a contribuição do usuário com pontos:\n\n' +
      '• Indicação Fornecida: +20 pontos\n' +
      '• Indicação Recebida: +30 pontos\n' +
      '• Negócio Fechado: +150 pontos\n' +
      '• Atualização de Perfil: +10 pontos\n' +
      '• Envio de Mensagem/Conexão no App: +15 pontos\n' +
      '• Feedback ou Recomendação: +10 pontos',
    icon: Trophy,
    color: '#b18c54',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Pular</Text>
        </TouchableOpacity>

        <View style={styles.slideContainer}>
          {React.createElement(onboardingData[currentIndex].icon, {
            size: 80,
            color: onboardingData[currentIndex].color,
            style: styles.icon,
          })}
          <Text style={styles.title}>{onboardingData[currentIndex].title}</Text>
          <Text style={styles.description}>{onboardingData[currentIndex].description}</Text>
        </View>

        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex === onboardingData.length - 1 ? 'Começar' : 'Próximo'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  skipButton: {
    alignSelf: 'flex-end',
  },
  skipText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.md,
    color: Colors.text.muted,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    fontSize: 80,
    marginBottom: 32,
  },
  title: {
    fontFamily: Typography.fonts.titleBold,
    fontSize: Typography.sizes.title,
    color: Colors.accent,
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.lg,
    color: Colors.text.primary,
    textAlign: 'center',
    lineHeight: 28,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: Colors.accent,
  },
  inactiveDot: {
    backgroundColor: Colors.border,
  },
  nextButton: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.lg,
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});