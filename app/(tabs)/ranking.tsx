import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Trophy, Medal, Award, Star } from 'lucide-react-native';

const mockRanking = [
  {
    id: '1',
    name: 'Maria Santos',
    company: 'Tech Innovation',
    points: 2450,
    level: 'infinity',
    badges: ['Conectora', 'Inovadora', 'Top Indicador'],
    position: 1,
  },
  {
    id: '2',
    name: 'João Silva',
    company: 'Silva Empreendimentos',
    points: 2100,
    level: 'socio',
    badges: ['Visionário', 'Networker'],
    position: 2,
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    company: 'Oliveira Consultoria',
    points: 1890,
    level: 'membro',
    badges: ['Mentor', 'Estrategista'],
    position: 3,
  },
  {
    id: '4',
    name: 'Ana Costa',
    company: 'Costa & Associados',
    points: 1720,
    level: 'infinity',
    badges: ['Líder'],
    position: 4,
  },
  {
    id: '5',
    name: 'Pedro Lima',
    company: 'Lima Ventures',
    points: 1580,
    level: 'membro',
    badges: ['Investidor'],
    position: 5,
  },
];

const badges = [
  { name: 'Conector Mestre', description: 'Fez mais de 50 conexões', icon: '🤝' },
  { name: 'Arquiteto de Negócio', description: 'Para quem fecha contratos acima de 500 mil', icon: '💵' },
  { name: 'Influencer Ouro', description: 'Para quem gera indicações estratégicas de alto impacto', icon: '⭐' },
  { name: 'Visionário', description: 'Para quem sempre mantém o perfil atualizado e engajado', icon: '💡' },
  { name: 'Guardião da comunidade', description: 'Para quem ajuda os outros membros a crescer', icon: '🛡️' },
  { name: 'Impulsionador', description: 'Para quem gera um ROI coletivo acima de R$ 1 milhão', icon: '🚀' },

];

export default function RankingScreen() {
  const [selectedTab, setSelectedTab] = useState<'ranking' | 'badges'>('ranking');

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy size={24} color="#FFD700" />;
      case 2:
        return <Medal size={24} color="#C0C0C0" />;
      case 3:
        return <Award size={24} color="#CD7F32" />;
      default:
        return <Text style={styles.positionNumber}>{position}</Text>;
    }
  };

  const getMemberCardColor = (level: string) => {
    return Colors.memberLevels[level as keyof typeof Colors.memberLevels] || Colors.border;
  };

  const renderRankingItem = ({ item }: { item: typeof mockRanking[0] }) => (
    <View style={[styles.rankingCard, { borderColor: getMemberCardColor(item.level) }]}>
      <View style={styles.positionContainer}>
        {getPositionIcon(item.position)}
      </View>
      
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberCompany}>{item.company}</Text>
        
        <View style={styles.badgesContainer}>
          {item.badges.slice(0, 2).map((badge, index) => (
            <View key={index} style={styles.badgeChip}>
              <Text style={styles.badgeChipText}>{badge}</Text>
            </View>
          ))}
          {item.badges.length > 2 && (
            <Text style={styles.moreBadges}>+{item.badges.length - 2}</Text>
          )}
        </View>
      </View>
      
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{item.points.toLocaleString()}</Text>
        <Text style={styles.pointsLabel}>pontos</Text>
      </View>
    </View>
  );

  const renderBadgeItem = ({ item }: { item: typeof badges[0] }) => (
    <View style={styles.badgeCard}>
      <Text style={styles.badgeIcon}>{item.icon}</Text>
      <View style={styles.badgeInfo}>
        <Text style={styles.badgeName}>{item.name}</Text>
        <Text style={styles.badgeDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gamificação</Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'ranking' && styles.activeTab]}
            onPress={() => setSelectedTab('ranking')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'ranking' && styles.activeTabText
            ]}>
              Ranking
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'badges' && styles.activeTab]}
            onPress={() => setSelectedTab('badges')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'badges' && styles.activeTabText
            ]}>
              Badges
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {selectedTab === 'ranking' ? (
        <FlatList
          data={mockRanking}
          renderItem={renderRankingItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      ) : (
        <FlatList
          data={badges}
          renderItem={renderBadgeItem}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontFamily: Typography.fonts.titleBold,
    fontSize: Typography.sizes.title,
    color: Colors.accent,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 4,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.accent,
  },
  tabText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
  },
  activeTabText: {
    color: Colors.primary,
    fontFamily: Typography.fonts.bold,
  },
  list: {
    paddingHorizontal: 20,
  },
  rankingCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
  },
  positionContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 16,
  },
  positionNumber: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.xl,
    color: Colors.text.muted,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.lg,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  memberCompany: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
    color: Colors.text.muted,
    marginBottom: 8,
  },
  badgesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeChip: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeChipText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.xs,
    color: Colors.primary,
  },
  moreBadges: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.sm,
    color: Colors.text.muted,
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  points: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.xl,
    color: Colors.accent,
  },
  pointsLabel: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
    color: Colors.text.muted,
  },
  badgeCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.border,
    borderWidth: 1,
  },
  badgeIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeName: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.lg,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  badgeDescription: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.muted,
    lineHeight: 20,
  },
});