import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Modal,
  TextInput 
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { User, CreditCard as Edit3, Mail, Instagram, Linkedin, Building, Calendar, MapPin, TrendingUp, Award, Settings } from 'lucide-react-native';

const mockUserData = {
  name: 'João Silva',
  company: 'Silva Empreendimentos',
  level: 'socio',
  email: 'joao@silva.com.br',
  instagram: '@joaosilva',
  linkedin: 'linkedin.com/in/joaosilva',
  birthYear: 1985,
  location: 'São Paulo, SP',
  brands: ['Silva Imóveis', 'Silva Invest', 'Silva Construções'],
  revenue: 'R$ 5-10M',
  experience: '20 anos',
  mainResults: 'Mais de 500 imóveis vendidos, 50 empreendimentos entregues',
  hasChildren: true,
  hobby: 'Golfe e Vela',
  website: 'www.silvaempreendimentos.com.br',
  fomentationValue: 0,
  points: 2100,
  badges: ['Visionário', 'Networker', 'Mentor'],
  connections: 87,
  indications: 23,
};

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [fomentationModalVisible, setFomentationModalVisible] = useState(false);
  const [newFomentationValue, setNewFomentationValue] = useState('');

  const getMemberCardColor = (level: string) => {
    return Colors.memberLevels[level as keyof typeof Colors.memberLevels] || Colors.border;
  };

  const handleUpdateFomentation = () => {
    // Aqui implementaria a lógica para atualizar o valor de fomentação
    setFomentationModalVisible(false);
    setNewFomentationValue('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: getMemberCardColor(mockUserData.level) }]}>
            <Text style={styles.avatarText}>{mockUserData.name.charAt(0)}</Text>
          </View>
          
          <Text style={styles.name}>{mockUserData.name}</Text>
          <Text style={styles.company}>{mockUserData.company}</Text>
          
          <View style={styles.levelBadge}>
            <Text style={[styles.levelText, { color: getMemberCardColor(mockUserData.level) }]}>
              {mockUserData.level.toUpperCase()}
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setModalVisible(true)}
          >
            <Edit3 size={16} color={Colors.primary} />
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mockUserData.points.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Pontos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mockUserData.connections}</Text>
            <Text style={styles.statLabel}>Conexões</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mockUserData.indications}</Text>
            <Text style={styles.statLabel}>Indicações</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges Conquistadas</Text>
          <View style={styles.badgesContainer}>
            {mockUserData.badges.map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Award size={16} color={Colors.accent} />
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          <View style={styles.infoItem}>
            <Mail size={20} color={Colors.accent} />
            <Text style={styles.infoText}>{mockUserData.email}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Calendar size={20} color={Colors.accent} />
            <Text style={styles.infoText}>Nascido em {mockUserData.birthYear}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <MapPin size={20} color={Colors.accent} />
            <Text style={styles.infoText}>{mockUserData.location}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Profissionais</Text>
          
          <View style={styles.infoItem}>
            <Building size={20} color={Colors.accent} />
            <Text style={styles.infoText}>{mockUserData.revenue} de faturamento</Text>
          </View>
          
          <View style={styles.infoItem}>
            <TrendingUp size={20} color={Colors.accent} />
            <Text style={styles.infoText}>{mockUserData.experience} de experiência</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Redes Sociais</Text>
          
          <View style={styles.infoItem}>
            <Instagram size={20} color={Colors.accent} />
            <Text style={styles.infoText}>{mockUserData.instagram}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Linkedin size={20} color={Colors.accent} />
            <Text style={styles.infoText}>{mockUserData.linkedin}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Valor de Fomentação</Text>
            <TouchableOpacity 
              style={styles.editFomentationButton}
              onPress={() => setFomentationModalVisible(true)}
            >
              <Edit3 size={16} color={Colors.accent} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.fomentationValue}>
            R$ {mockUserData.fomentationValue.toLocaleString('pt-BR')}
          </Text>
        </View>
      </ScrollView>

      {/* Modal de Edição de Perfil */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <Text style={styles.modalDescription}>
              Funcionalidade em desenvolvimento
            </Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Fomentação */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={fomentationModalVisible}
        onRequestClose={() => setFomentationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Atualizar Fomentação</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Novo valor (R$)</Text>
              <TextInput
                style={styles.input}
                value={newFomentationValue}
                onChangeText={setNewFomentationValue}
                placeholder="0,00"
                keyboardType="numeric"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setFomentationModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleUpdateFomentation}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.hero,
    color: Colors.primary,
  },
  name: {
    fontFamily: Typography.fonts.titleBold,
    fontSize: Typography.sizes.title,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  company: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.lg,
    color: Colors.accent,
    marginBottom: 12,
  },
  levelBadge: {
    backgroundColor: Colors.background.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 16,
  },
  levelText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.sm,
    letterSpacing: 1,
  },
  editButton: {
    backgroundColor: Colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  editButtonText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.md,
    color: Colors.primary,
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 24,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.xxl,
    color: Colors.accent,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.sm,
    color: Colors.text.muted,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: Typography.fonts.titleBold,
    fontSize: Typography.sizes.lg,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: Colors.background.card,
    borderColor: Colors.accent,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    marginBottom: 8,
  },
  badgeText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.sm,
    color: Colors.text.primary,
    marginLeft: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    marginLeft: 16,
    flex: 1,
  },
  editFomentationButton: {
    padding: 8,
  },
  fomentationValue: {
    fontFamily: Typography.fonts.titleBold,
    fontSize: Typography.sizes.title,
    color: Colors.accent,
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
    maxWidth: 400,
  },
  modalTitle: {
    fontFamily: Typography.fonts.titleBold,
    fontSize: Typography.sizes.xl,
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalDescription: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.muted,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.sm,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.background.primary,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: Colors.border,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 0.45,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
  },
  saveButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 0.45,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.md,
    color: Colors.primary,
  },
  closeModalButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeModalButtonText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.md,
    color: Colors.primary,
  },
});