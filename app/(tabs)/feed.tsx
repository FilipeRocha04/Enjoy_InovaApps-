import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  RefreshControl
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { MessageSquare } from 'lucide-react-native';

const mockFeed = [
  {
    id: '1',
    author: 'Maria Santos',
    title: 'Nova parceria entre Tech Innovation e Silva Empreendimentos',
    content: 'As empresas anunciaram uma colaboração para desenvolver soluções inovadoras no setor imobiliário.',
    timestamp: 'há 2 horas',
  },
  {
    id: '2',
    author: 'João Silva',
    title: 'Evento de networking reúne empresários',
    content: 'O evento realizado ontem contou com a presença de mais de 100 membros da comunidade.',
    timestamp: 'há 5 horas',
  },
  {
    id: '3',
    author: 'Carlos Oliveira',
    title: 'Consultoria Oliveira lança programa de mentoria',
    content: 'O novo programa visa apoiar jovens empreendedores na área de gestão estratégica.',
    timestamp: 'há 1 dia',
  },
];

export default function FeedScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderFeedItem = ({ item }: { item: typeof mockFeed[0] }) => (
    <View style={styles.feedCard}>
      <Text style={styles.feedTitle}>{item.title}</Text>
      <Text style={styles.feedContent}>{item.content}</Text>
      <View style={styles.feedFooter}>
        <Text style={styles.feedAuthor}>{item.author}</Text>
        <Text style={styles.feedTimestamp}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Feed de Notícias</Text>
      </View>
      <FlatList
        data={mockFeed}
        renderItem={renderFeedItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
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
  feedList: {
    paddingHorizontal: 20,
  },
  feedCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  feedTitle: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.lg,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  feedContent: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  feedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feedAuthor: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.sm,
    color: Colors.accent,
  },
  feedTimestamp: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
    color: Colors.text.muted,
  },
});
