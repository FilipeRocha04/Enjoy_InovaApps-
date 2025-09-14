import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  SafeAreaView,
  Modal 
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Search, Filter, MessageSquare, Star } from 'lucide-react-native';

const mockMembers = [
  {
    id: '1',
    name: 'João Silva',
    company: 'Silva Empreendimentos',
    segment: 'Imobiliário',
    level: 'socio',
    bio: 'Empresário visionário com 20 anos de experiência no mercado imobiliário. Especialista em desenvolvimento de grandes projetos.',
    instagram: '@joaosilva',
    linkedin: 'linkedin.com/in/joaosilva',
    email: 'joao@silva.com.br',
  },
  {
    id: '2',
    name: 'Maria Santos',
    company: 'Tech Innovation',
    segment: 'Tecnologia',
    level: 'infinity',
    bio: 'CEO e fundadora de startup de tecnologia. Formada em engenharia, apaixonada por inovação e transformação digital.',
    instagram: '@mariasantos',
    linkedin: 'linkedin.com/in/mariasantos',
    email: 'maria@techinnovation.com',
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    company: 'Oliveira Consultoria',
    segment: 'Consultoria',
    level: 'membro',
    bio: 'Consultor empresarial com expertise em gestão estratégica e desenvolvimento organizacional.',
    instagram: '@carlosoliveira',
    linkedin: 'linkedin.com/in/carlosoliveira',
    email: 'carlos@consultoria.com',
  },
];

const segments = [
  'Todos',
  'ADVOCACIA',
  'FOOD',
  'ARQUITETURA',
  'FRANQUIAS',
  'COMÉRCIO',
  'IMOBILIÁRIO',
  'LICITAÇÃO',
  'COMEX',
  'CONSTRUTORA & INCORPORADORA',
  'LOGÍSTICA & TRANSPORTE',
  'CONSULTORIA',
  'MARKETING',
  'CONTÁBIL',
  'RECURSOS HUMANOS',
  'EDUCAÇÃO',
  'SAÚDE',
  'ENGENHARIA',
  'SEGUROS',
  'EVENTOS & PRODUÇÕES',
  'TECNOLOGIA',
  'FINANÇAS & INVESTIMENTOS',
  'VEÍCULOS'
];

type Member = {
  id: string;
  name: string;
  company: string;
  segment: string;
  level: string;
  bio: string;
  instagram: string;
  linkedin: string;
  email: string;
};

export default function MembersScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('Todos');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getMemberCardColor = (level: string) => {
    return Colors.memberLevels[level as keyof typeof Colors.memberLevels] || Colors.border;
  };

  const filteredMembers = mockMembers.filter(member => {
  const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
 
  const matchesSearch = normalize(member.name).includes(normalize(searchText)) ||
             normalize(member.company).includes(normalize(searchText)) ||
             normalize(member.segment).includes(normalize(searchText));
    const matchesLevel = normalize(member.level).includes(normalize(searchText)) ||
      normalize(member.level).includes(normalize(searchText));
    const matchesSegment = selectedSegment === 'Todos' || normalize(member.segment) === normalize(selectedSegment);
    return matchesSearch && matchesSegment;
  });

  const renderMemberCard = ({ item }: { item: typeof mockMembers[0] }) => (
    <TouchableOpacity
      style={[styles.memberCard, { borderColor: getMemberCardColor(item.level) }]}
      onPress={() => {
        setSelectedMember(item);
        setModalVisible(true);
      }}
    >
      <View style={[styles.memberAvatar, { backgroundColor: getMemberCardColor(item.level) }]}>
        <Text style={styles.memberAvatarText}>{item.name.charAt(0)}</Text>
      </View>
      
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberCompany}>{item.company}</Text>
        <Text style={styles.memberSegment}>{item.segment}</Text>
        
        <View style={styles.memberLevel}>
          <Text style={[styles.levelText, { color: getMemberCardColor(item.level) }]}>
            {item.level.toUpperCase()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.title}>Membros</Text>
          <TouchableOpacity
            style={styles.chatIconButton}
            onPress={() => router.push('/(tabs)/chat')}
          >
            <MessageSquare size={28} color={Colors.accent} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.text.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome, empresa ou segmento"
            placeholderTextColor={Colors.text.muted}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={segments}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedSegment === item && styles.filterChipActive
              ]}
              onPress={() => setSelectedSegment(item)}
            >
              <Text style={[
                styles.filterChipText,
                selectedSegment === item && styles.filterChipTextActive
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredMembers}
        renderItem={renderMemberCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.membersGallery}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedMember && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[
                    styles.modalAvatar, 
                    { backgroundColor: getMemberCardColor(selectedMember.level) }
                  ]}>
                    <Text style={styles.modalAvatarText}>
                      {selectedMember.name.charAt(0)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalName}>{selectedMember.name}</Text>
                <Text style={styles.modalCompany}>{selectedMember.company}</Text>
                
                <Text style={styles.modalBio}>{selectedMember.bio}</Text>

                <View style={styles.socialLinks}>
                  <Text style={styles.socialLinksTitle}>Contatos</Text>
                  <Text style={styles.socialLink}>📧 {selectedMember.email}</Text>
                  <Text style={styles.socialLink}>📱 {selectedMember.instagram}</Text>
                  <Text style={styles.socialLink}>💼 {selectedMember.linkedin}</Text>
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Star size={20} color={Colors.primary} />
                    <Text style={styles.actionButtonText}>Indicar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                      setModalVisible(false);
                      router.push({ pathname: '/(tabs)/chat', params: { member: selectedMember?.name } });
                    }}
                  >
                    <MessageSquare size={20} color={Colors.primary} />
                    <Text style={styles.actionButtonText}>Mensagem</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatIconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
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
  filtersContainer: {
    paddingLeft: 20,
    marginBottom: 16,
  },
  filterChip: {
    backgroundColor: Colors.background.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  filterChipActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  filterChipText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.sm,
    color: Colors.text.primary,
  },
  filterChipTextActive: {
    color: Colors.primary,
  },
  membersGallery: {
    paddingHorizontal: 10,
    paddingTop: 10,
    gap: 12,
  },
  memberCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 2,
    marginHorizontal: 6,
    minWidth: 150,
    maxWidth: '48%',
  },
  memberAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  memberAvatarText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.xl,
    color: Colors.primary,
  },
  memberInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberName: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.lg,
    color: Colors.text.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  memberCompany: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.md,
    color: Colors.text.muted,
    marginBottom: 4,
    textAlign: 'center',
  },
  memberSegment: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
    color: Colors.text.muted,
    marginBottom: 8,
    textAlign: 'center',
  },
  memberLevel: {
    alignSelf: 'center',
    marginTop: 4,
  },
  levelText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.xs,
    letterSpacing: 1,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalAvatarText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.title,
    color: Colors.primary,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.lg,
    color: Colors.text.muted,
  },
  modalName: {
    fontFamily: Typography.fonts.titleBold,
    fontSize: Typography.sizes.xl,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  modalCompany: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.lg,
    color: Colors.accent,
    marginBottom: 16,
  },
  modalBio: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    lineHeight: 24,
    marginBottom: 24,
  },
  socialLinks: {
    marginBottom: 24,
  },
  socialLinksTitle: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.lg,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  socialLink: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.muted,
    marginBottom: 8,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: Colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 0.48,
    justifyContent: 'center',
  },
  actionButtonText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.md,
    color: Colors.primary,
    marginLeft: 8,
  },
});