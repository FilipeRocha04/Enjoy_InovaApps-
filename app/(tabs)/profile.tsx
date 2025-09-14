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
  nome: 'João Silva',
  empresa: 'Silva Empreendimentos',
  level: 'socio',
  email: 'joao@silva.com.br',
  instagram: '@joaosilva',
  linkedin: 'linkedin.com/in/joaosilva',
  anoNascimento: '1985',
  local: 'São Paulo, SP',
  marcas: 'Silva Imóveis, Silva Invest, Silva Construções',
  faturamento: 'R$ 5-10M',
  tempoAtuacao: '20 anos',
  principaisResultados: 'Mais de 500 imóveis vendidos, 50 empreendimentos entregues',
  possuiFilhos: true,
  quantidadeFilhos: '2',
  hobby: 'Golfe e Vela',
  formacaoAcademica: 'Administração',
  setor: 'Imobiliário',
  experienciaArea: '20 anos',
  lemaVida: 'Vencer é uma escolha',
  reconhecimentos: 'Prêmio Top Imobiliário',
  buscaMomento: 'Novas parcerias',
  site: 'www.silvaempreendimentos.com.br',
  fotoPerfil: null,
  fechou: true,
  fomentationValue: 0,
  points: 2100,
  badges: ['Visionário', 'Networker', 'Mentor'],
  connections: 87,
  indications: 23,
  bio: 'Empreendedor apaixonado por inovação e desenvolvimento imobiliário. Sempre buscando novas parcerias e oportunidades para crescer.',
};

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [fomentationModalVisible, setFomentationModalVisible] = useState(false);
  const [newFomentationValue, setNewFomentationValue] = useState('');
  const [userData, setUserData] = useState(mockUserData);
  const [editData, setEditData] = useState(mockUserData);

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
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <User size={64} color={Colors.accent} />
          </View>
          <Text style={styles.name}>{userData.nome}</Text>
          <Text style={styles.company}>{userData.empresa}</Text>
          <View style={styles.levelBadge}>
            <Text style={[styles.levelText, { color: '#b87333' }]}>{userData.level}</Text>
          </View>
          {/* Campo de texto editável para Bio abaixo do campo 'socio' */}
  <View style={styles.bioContainer}>
    <TextInput
      style={styles.bioTextInput}
      value={userData.bio}
      editable={false}
      multiline
      placeholder="Aqui ficará a BIO gerada pela IA"
    />
  </View>
        </View>
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
            <Edit3 size={16} color={Colors.primary} />
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iaButton} onPress={() => {/* ação para gerar bio com IA */}}>
            <Text style={styles.iaButtonText}>Gerar Bio com IA</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.points.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Pontos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.connections}</Text>
            <Text style={styles.statLabel}>Conexões</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.indications}</Text>
            <Text style={styles.statLabel}>Indicações</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges Conquistadas</Text>
          <View style={styles.badgesContainer}>
            {userData.badges.map((badge, index) => (
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
            <Text style={styles.infoText}>{userData.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Calendar size={20} color={Colors.accent} />
            <Text style={styles.infoText}>Nascido em {userData.anoNascimento}</Text>
          </View>
          <View style={styles.infoItem}>
            <MapPin size={20} color={Colors.accent} />
            <Text style={styles.infoText}>{userData.local}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Profissionais</Text>
          <View style={styles.infoItem}>
            <Building size={20} color={Colors.accent} />
            <Text style={styles.infoText}>{userData.faturamento} de faturamento</Text>
          </View>
          <View style={styles.infoItem}>
            <TrendingUp size={20} color={Colors.accent} />
            <Text style={styles.infoText}>{userData.experienciaArea} de experiência</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Redes Sociais</Text>
          <View style={styles.infoItem}>
            <Instagram size={20} color={Colors.accent} />
            <Text style={styles.infoText}>{userData.instagram}</Text>
          </View>
          <View style={styles.infoItem}>
            <Linkedin size={20} color={Colors.accent} />
            <Text style={styles.infoText}>{userData.linkedin}</Text>
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
            R$ {userData.fomentationValue.toLocaleString('pt-BR')}
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
          <View style={[styles.modalContent, { maxHeight: '90%' }]}> {/* Limita altura para scroll */}
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <View style={{ flex: 1 }}>
              <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Nome</Text><TextInput style={styles.input} value={editData.nome} onChangeText={v => setEditData(prev => ({ ...prev, nome: v }))} placeholder="Nome" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Empresa</Text><TextInput style={styles.input} value={editData.empresa} onChangeText={v => setEditData(prev => ({ ...prev, empresa: v }))} placeholder="Empresa" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Email</Text><TextInput style={styles.input} value={editData.email} onChangeText={v => setEditData(prev => ({ ...prev, email: v }))} placeholder="Email" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Instagram</Text><TextInput style={styles.input} value={editData.instagram} onChangeText={v => setEditData(prev => ({ ...prev, instagram: v }))} placeholder="Instagram" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>LinkedIn</Text><TextInput style={styles.input} value={editData.linkedin} onChangeText={v => setEditData(prev => ({ ...prev, linkedin: v }))} placeholder="LinkedIn" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Ano de Nascimento</Text><TextInput style={styles.input} value={editData.anoNascimento} onChangeText={v => setEditData(prev => ({ ...prev, anoNascimento: v }))} placeholder="Ano de Nascimento" keyboardType="numeric" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Localização</Text><TextInput style={styles.input} value={editData.local} onChangeText={v => setEditData(prev => ({ ...prev, local: v }))} placeholder="Localização" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Marcas/Empresas</Text><TextInput style={styles.input} value={editData.marcas} onChangeText={v => setEditData(prev => ({ ...prev, marcas: v }))} placeholder="Marcas/Empresas" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Faturamento</Text><TextInput style={styles.input} value={editData.faturamento} onChangeText={v => setEditData(prev => ({ ...prev, faturamento: v }))} placeholder="Faturamento" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Tempo de Atuação</Text><TextInput style={styles.input} value={editData.tempoAtuacao} onChangeText={v => setEditData(prev => ({ ...prev, tempoAtuacao: v }))} placeholder="Tempo de Atuação" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Principais Resultados</Text><TextInput style={styles.input} value={editData.principaisResultados} onChangeText={v => setEditData(prev => ({ ...prev, principaisResultados: v }))} placeholder="Principais Resultados" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Possui Filhos?</Text><TextInput style={styles.input} value={editData.possuiFilhos ? 'Sim' : 'Não'} onChangeText={v => setEditData(prev => ({ ...prev, possuiFilhos: v === 'Sim' }))} placeholder="Possui Filhos?" /></View>
                {editData.possuiFilhos && (<View style={styles.inputContainer}><Text style={styles.inputLabel}>Quantidade de Filhos</Text><TextInput style={styles.input} value={editData.quantidadeFilhos} onChangeText={v => setEditData(prev => ({ ...prev, quantidadeFilhos: v }))} placeholder="Quantidade de Filhos" keyboardType="numeric" /></View>)}
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Hobby</Text><TextInput style={styles.input} value={editData.hobby} onChangeText={v => setEditData(prev => ({ ...prev, hobby: v }))} placeholder="Hobby" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Formação Acadêmica</Text><TextInput style={styles.input} value={editData.formacaoAcademica} onChangeText={v => setEditData(prev => ({ ...prev, formacaoAcademica: v }))} placeholder="Formação Acadêmica" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Setor</Text><TextInput style={styles.input} value={editData.setor} onChangeText={v => setEditData(prev => ({ ...prev, setor: v }))} placeholder="Setor" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Experiência na Área</Text><TextInput style={styles.input} value={editData.experienciaArea} onChangeText={v => setEditData(prev => ({ ...prev, experienciaArea: v }))} placeholder="Experiência na Área" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Lema de Vida</Text><TextInput style={styles.input} value={editData.lemaVida} onChangeText={v => setEditData(prev => ({ ...prev, lemaVida: v }))} placeholder="Lema de Vida" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Reconhecimentos</Text><TextInput style={styles.input} value={editData.reconhecimentos} onChangeText={v => setEditData(prev => ({ ...prev, reconhecimentos: v }))} placeholder="Reconhecimentos" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>O que busca no momento?</Text><TextInput style={styles.input} value={editData.buscaMomento} onChangeText={v => setEditData(prev => ({ ...prev, buscaMomento: v }))} placeholder="O que busca no momento?" /></View>
                <View style={styles.inputContainer}><Text style={styles.inputLabel}>Site</Text><TextInput style={styles.input} value={editData.site} onChangeText={v => setEditData(prev => ({ ...prev, site: v }))} placeholder="Site" /></View>
                <View style={{ height: 32 }} />
              </ScrollView>
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={() => { setUserData(editData); setModalVisible(false); }}>
                  <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  iaButton: {
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  iaButtonText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.md,
    color: Colors.accent,
  },
  bioContainer: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  bioText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  bioTextInput: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    textAlign: 'center',
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 12,
    minHeight: 60,
    marginTop: 8,
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