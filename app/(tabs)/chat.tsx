import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  TextInput 
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { MessageSquare, Search } from 'lucide-react-native';

const mockChats = [
  {
    id: '1',
    name: 'João Silva',
    company: 'Silva Empreendimentos',
    lastMessage: 'Ótima ideia! Vamos marcar uma reunião.',
    timestamp: '14:30',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Maria Santos',
    company: 'Tech Innovation',
    lastMessage: 'Obrigada pela indicação!',
    timestamp: '12:45',
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    company: 'Oliveira Consultoria',
    lastMessage: 'Podemos conversar amanhã?',
    timestamp: 'Ontem',
    unreadCount: 1,
  },
];

export default function ChatScreen() {
  const [searchText, setSearchText] = useState('');
  const [activeChat, setActiveChat] = useState<typeof mockChats[0] | null>(null);

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchText.toLowerCase()) ||
    chat.company.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderChatItem = ({ item }: { item: typeof mockChats[0] }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => setActiveChat(item)}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        
        <Text style={styles.company}>{item.company}</Text>
        
        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {activeChat ? (
        <View style={{ flex: 1, backgroundColor: Colors.background.card }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: Colors.border }}>
            <TouchableOpacity onPress={() => setActiveChat(null)} style={{ marginRight: 12, padding: 8 }}>
              <Text style={{ fontSize: 22, color: Colors.text.primary }}>←</Text>
            </TouchableOpacity>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{activeChat.name.charAt(0)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.chatName}>{activeChat.name}</Text>
              <Text style={styles.company}>{activeChat.company}</Text>
            </View>
          </View>
          <View style={{ flex: 1, padding: 16 }}>
            {/* Mensagens simuladas */}
            <View style={{ alignSelf: 'flex-start', backgroundColor: Colors.background.primary, borderRadius: 16, padding: 10, marginBottom: 8, maxWidth: '80%' }}><Text style={styles.lastMessage}>Olá, tudo bem?</Text></View>
            <View style={{ alignSelf: 'flex-end', backgroundColor: Colors.accent, borderRadius: 16, padding: 10, marginBottom: 8, maxWidth: '80%' }}><Text style={[styles.lastMessage, { color: Colors.primary }]}>Oi! Tudo ótimo, e você?</Text></View>
            <View style={{ alignSelf: 'flex-start', backgroundColor: Colors.background.primary, borderRadius: 16, padding: 10, marginBottom: 8, maxWidth: '80%' }}><Text style={styles.lastMessage}>{activeChat.lastMessage}</Text></View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.background.card }}>
            <TextInput style={{ flex: 1, backgroundColor: Colors.background.primary, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, fontFamily: Typography.fonts.regular, fontSize: Typography.sizes.md, color: Colors.text.primary, marginRight: 8 }} placeholder="Digite sua mensagem..." />
            <TouchableOpacity style={{ backgroundColor: Colors.accent, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 }}><Text style={{ fontFamily: Typography.fonts.bold, fontSize: Typography.sizes.md, color: Colors.primary }}>Enviar</Text></TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Mensagens</Text>
            <View style={styles.searchContainer}>
              <Search size={20} color={Colors.text.muted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar conversas"
                placeholderTextColor={Colors.text.muted}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </View>
          {filteredChats.length > 0 ? (
            <FlatList
              data={filteredChats}
              renderItem={renderChatItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.chatList}
            />
          ) : (
            <View style={styles.emptyState}>
              <MessageSquare size={64} color={Colors.text.muted} />
              <Text style={styles.emptyStateTitle}>Nenhuma conversa</Text>
              <Text style={styles.emptyStateDescription}>
                {searchText ? 'Nenhuma conversa encontrada' : 'Comece uma conversa com outros membros'}
              </Text>
            </View>
          )}
        </>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
  },
  chatList: {
    paddingHorizontal: 20,
  },
  chatItem: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.border,
    borderWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.lg,
    color: Colors.primary,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.lg,
    color: Colors.text.primary,
  },
  timestamp: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
    color: Colors.text.muted,
  },
  company: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
    color: Colors.text.muted,
    marginBottom: 8,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    flex: 1,
    marginRight: 12,
  },
  unreadBadge: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  unreadText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.xl,
    color: Colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.muted,
    textAlign: 'center',
    lineHeight: 24,
  },
});