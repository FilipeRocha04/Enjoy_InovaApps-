import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Users, MessageSquare, Trophy, Target } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Manifesto</Text>
          <Image
            source={require('@/assets/images/Logo NexEnjoy.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.manifestoCard}>
          <Text style={styles.manifestoTitle}>Nossa Missão</Text>
          <Text style={styles.manifestoText}>
           Somos uma comunidade de empresários que se
 recusam a aceitar conceitos enlatados e que amam
 quebrar padrões para viver o novo. Somos a evolução do
 desenvolvimento empresarial. Se você tem humildade
 para reconhecer que, em algum aspecto, você pode ser
 ainda melhor e tem disposição para mudar . você é um
 de nós. Prepare-se para ser encorajado a novas jornadas
 sobre si. 
 
 <p>Bem-vindo ao universo dos negócios fora do
 comum.</p>
          </Text>
          
        </View>

        <View style={styles.quickAccess}>
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          
          <View style={styles.accessGrid}>
            <TouchableOpacity 
              style={styles.accessCard}
              onPress={() => router.push('/(tabs)/members')}
            >
              <Users size={32} color={Colors.accent} />
              <Text style={styles.accessCardTitle}>Membros</Text>
              <Text style={styles.accessCardDescription}>
                Conecte-se com outros empresários
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.accessCard}
              onPress={() => router.push('/(tabs)/chat')}
            >
              <MessageSquare size={32} color={Colors.accent} />
              <Text style={styles.accessCardTitle}>Mensagens</Text>
              <Text style={styles.accessCardDescription}>
                Converse diretamente
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.accessCard} 
            onPress={() => router.push('/(tabs)/feed')}>
              
              <Target size={32} color={Colors.accent} />
              
              <Text style={styles.accessCardTitle}>Feed</Text>
              <Text style={styles.accessCardDescription}>
                Veja novidades, oportunidades e interaja com a comunidade
              </Text>
             
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.accessCard}
              onPress={() => router.push('/(tabs)/ranking')}
            >
              <Trophy size={32} color={Colors.accent} />
              <Text style={styles.accessCardTitle}>Ranking</Text>
              <Text style={styles.accessCardDescription}>
                Veja sua posição
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.stats}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>248</Text>
              <Text style={styles.statLabel}>Membros Ativos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>1,432</Text>
              <Text style={styles.statLabel}>Conexões Feitas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>R$ 2.8M</Text>
              <Text style={styles.statLabel}>Negócios Gerados</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontFamily: Typography.fonts.titleBold,
    fontSize: Typography.sizes.hero,
    color: Colors.accent,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.lg,
    color: Colors.text.muted,
  },
  manifestoCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderColor: Colors.accent,
    borderWidth: 1,
  },
  manifestoTitle: {
    fontFamily: Typography.fonts.titleBold,
    fontSize: Typography.sizes.xl,
    color: Colors.accent,
    marginBottom: 16,
  },
  manifestoText: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    lineHeight: 24,
    marginBottom: 16,
  },
  quickAccess: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: Typography.fonts.titleBold,
    fontSize: Typography.sizes.xl,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  accessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  accessCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 20,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    borderColor: Colors.border,
    borderWidth: 1,
  },
  accessCardTitle: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    marginTop: 12,
    marginBottom: 8,
  },
  accessCardDescription: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
    color: Colors.text.muted,
    textAlign: 'center',
  },
  stats: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    width: '30%',
    alignItems: 'center',
    borderColor: Colors.border,
    borderWidth: 1,
  },
  statNumber: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.xl,
    color: Colors.accent,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.xs,
    color: Colors.text.muted,
    textAlign: 'center',
  },
});