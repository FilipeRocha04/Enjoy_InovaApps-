import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

interface FormData {
  nome: string;
  cpf: string;
  empresa: string;
  anoNascimento: string;
  local: string;
  marcas: string;
  faturamento: string;
  tempoAtuacao: string; // campo antigo, pode ser removido depois
  // Removido duplicidade, já está declarado abaixo
  principaisResultados: string;
  possuiFilhos: boolean | null;
  hobby: string;
  instagram: string;
  email: string;
  site: string;
  linkedin: string;
  fechou: boolean | null;
  fotoPerfil: string | null;
  quantidadeFilhos: string;
    formacaoAcademica: string;
    setor: string;
  experienciaArea: string;
  lemaVida: string;
  reconhecimentos: string;
  buscaMomento: string;
}

const faturamentoOptions = [
  'Até R$ 1M',
  'R$ 1-5M',
  'R$ 5-10M',
  'R$ 10-20M',
  'R$ 20M+'
];

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cpf: '',
    empresa: '',
    anoNascimento: '',
    local: '',
    marcas: '',
    faturamento: '',
  tempoAtuacao: '', // campo antigo, pode ser removido depois
  // Removido duplicidade, já está declarado abaixo
    principaisResultados: '',
    possuiFilhos: null,
    quantidadeFilhos: '',
    hobby: '',
    instagram: '',
    email: '',
    site: '',
    linkedin: '',
    fechou: null,
    fotoPerfil: null,
    formacaoAcademica: '',
  setor: '',
  experienciaArea: '',
  lemaVida: '',
  reconhecimentos: '',
  buscaMomento: '',
  });
  const [uploading, setUploading] = useState(false);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      updateFormData('fotoPerfil', result.assets[0].uri);
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validação básica
  const requiredFields = ['nome', 'cpf', 'empresa', 'email', 'anoNascimento', 'local'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
    if (missingFields.length > 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Toast para informar o usuário
    if (Platform.OS === 'android') {
      // @ts-ignore
      import('react-native').then(RN => {
        RN.ToastAndroid.show('Cadastro enviado! Aguarde a liberação do administrador.', RN.ToastAndroid.LONG);
      });
    } else {
      Alert.alert('Cadastro enviado!', 'Aguarde a liberação do administrador.');
    }

    setTimeout(() => {
      router.replace('/login');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.subtitle}>Preencha suas informações</Text>
          </View>

          

          <View style={styles.form}>
            
            {/* Foto de perfil */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Foto de Perfil</Text>
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={pickImage}>
                {formData.fotoPerfil ? (
                  <Image source={{ uri: formData.fotoPerfil }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 8 }} />
                ) : (
                  <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.background.card, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ color: Colors.text.muted }}>Selecionar Foto</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Nome completo */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome Completo *</Text>
              <TextInput
                style={styles.input}
                value={formData.nome}
                onChangeText={(value) => updateFormData('nome', value)}
                placeholder="Seu nome completo"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            {/* CPF */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>CPF *</Text>
              <TextInput
                style={styles.input}
                value={formData.cpf}
                onChangeText={(value) => updateFormData('cpf', value)}
                placeholder="Digite seu CPF"
                placeholderTextColor={Colors.text.muted}
                keyboardType="numeric"
                maxLength={14}
              />
            </View>

            {/* Empresa atual */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Empresa *</Text>
              <TextInput
                style={styles.input}
                value={formData.empresa}
                onChangeText={(value) => updateFormData('empresa', value)}
                placeholder="Nome da sua empresa"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            {/* Ano de nascimento */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ano de Nascimento *</Text>
              <TextInput
                style={styles.input}
                value={formData.anoNascimento}
                onChangeText={(value) => updateFormData('anoNascimento', value)}
                placeholder="AAAA"
                placeholderTextColor={Colors.text.muted}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>

            {/* Localização */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Localização *</Text>
              <TextInput
                style={styles.input}
                value={formData.local}
                onChangeText={(value) => updateFormData('local', value)}
                placeholder="Cidade, Estado"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            {/* Marcas/empresas diferentes que representa */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Marcas/Empresas que representa</Text>
              <TextInput
                style={styles.textArea}
                value={formData.marcas}
                onChangeText={(value) => updateFormData('marcas', value)}
                placeholder="Liste as marcas e empresas"
                placeholderTextColor={Colors.text.muted}
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Faturamento anual */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Faturamento Anual</Text>
              <View style={styles.radioGroup}>
                {faturamentoOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.radioOption}
                    onPress={() => updateFormData('faturamento', option)}
                  >
                    <View style={[
                      styles.radioCircle,
                      formData.faturamento === option && styles.radioSelected
                    ]} />
                    <Text style={styles.radioText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Principais resultados/cases de sucesso */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Principais Resultados</Text>
              <TextInput
                style={styles.textArea}
                value={formData.principaisResultados}
                onChangeText={(value) => updateFormData('principaisResultados', value)}
                placeholder="Descreva seus principais resultados e conquistas"
                placeholderTextColor={Colors.text.muted}
                multiline
                numberOfLines={4}
              />
            </View>

            {/* Possui filhos */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Possui Filhos?</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => updateFormData('possuiFilhos', true)}
                >
                  <View style={[
                    styles.radioCircle,
                    formData.possuiFilhos === true && styles.radioSelected
                  ]} />
                  <Text style={styles.radioText}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => updateFormData('possuiFilhos', false)}
                >
                  <View style={[
                    styles.radioCircle,
                    formData.possuiFilhos === false && styles.radioSelected
                  ]} />
                  <Text style={styles.radioText}>Não</Text>
                </TouchableOpacity>
              </View>
              {formData.possuiFilhos === true && (
                <View style={{ marginTop: 8 }}>
                  <Text style={styles.label}>Quantidade de Filhos</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.quantidadeFilhos}
                    onChangeText={(value) => updateFormData('quantidadeFilhos', value)}
                    placeholder="Informe a quantidade"
                    placeholderTextColor={Colors.text.muted}
                    keyboardType="numeric"
                  />
                </View>
              )}
            </View>

            {/* Hobby */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Hobby</Text>
              <TextInput
                style={styles.input}
                value={formData.hobby}
                onChangeText={(value) => updateFormData('hobby', value)}
                placeholder="Seus hobbies e interesses"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            {/* Formação acadêmica e certificações */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Formação Acadêmica</Text>
              <TextInput
                style={styles.input}
                value={formData.formacaoAcademica}
                onChangeText={(value) => updateFormData('formacaoAcademica', value)}
                placeholder="Informe sua formação acadêmica"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            {/* Setor ou área de atuação */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Setor ou Área de Atuação</Text>
              <TextInput
                style={styles.input}
                value={formData.setor}
                onChangeText={(value) => updateFormData('setor', value)}
                placeholder="Informe seu setor ou área de atuação"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            {/* Tempo de experiência na área */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tempo de Experiência na Área</Text>
              <TextInput
                style={styles.input}
                value={formData.experienciaArea}
                onChangeText={(value) => updateFormData('experienciaArea', value)}
                placeholder="Ex: 5 anos"
                placeholderTextColor={Colors.text.muted}
                keyboardType="numeric"
              />
            </View>

            {/* Reconhecimentos ou prêmios recebidos */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Reconhecimentos ou Prêmios Recebidos</Text>
              <TextInput
                style={styles.input}
                value={formData.reconhecimentos}
                onChangeText={(value) => updateFormData('reconhecimentos', value)}
                placeholder="Liste seus reconhecimentos ou prêmios"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            {/* Frase ou lema de vida */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Frase ou Lema de Vida</Text>
              <TextInput
                style={styles.input}
                value={formData.lemaVida}
                onChangeText={(value) => updateFormData('lemaVida', value)}
                placeholder="Digite sua frase ou lema de vida"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            {/* O que busca no momento */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>O que busca no momento?</Text>
              <TextInput
                style={styles.input}
                value={formData.buscaMomento}
                onChangeText={(value) => updateFormData('buscaMomento', value)}
                placeholder="Ex: parcerias, expansão, investimentos, conexões estratégicas, etc."
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            {/* Instagram */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Instagram</Text>
              <TextInput
                style={styles.input}
                value={formData.instagram}
                onChangeText={(value) => updateFormData('instagram', value)}
                placeholder="@seuperfil"
                placeholderTextColor={Colors.text.muted}
                autoCapitalize="none"
              />
            </View>

            {/* E-mail */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                placeholder="seu@email.com"
                placeholderTextColor={Colors.text.muted}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Site */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Site</Text>
              <TextInput
                style={styles.input}
                value={formData.site}
                onChangeText={(value) => updateFormData('site', value)}
                placeholder="www.seusite.com"
                placeholderTextColor={Colors.text.muted}
                autoCapitalize="none"
              />
            </View>

            {/* LinkedIn */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>LinkedIn</Text>
              <TextInput
                style={styles.input}
                value={formData.linkedin}
                onChangeText={(value) => updateFormData('linkedin', value)}
                placeholder="linkedin.com/in/seuperfil"
                placeholderTextColor={Colors.text.muted}
                autoCapitalize="none"
              />
            </View>
            {/* <View style={styles.inputContainer}>
              <Text style={styles.label}>Foto de Perfil</Text>
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={pickImage}>
                {formData.fotoPerfil ? (
                  <Image source={{ uri: formData.fotoPerfil }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 8 }} />
                ) : (
                  <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.background.card, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ color: Colors.text.muted }}>Selecionar Foto</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome Completo *</Text>
              <TextInput
                style={styles.input}
                value={formData.nome}
                onChangeText={(value) => updateFormData('nome', value)}
                placeholder="Seu nome completo"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Empresa *</Text>
              <TextInput
                style={styles.input}
                value={formData.empresa}
                onChangeText={(value) => updateFormData('empresa', value)}
                placeholder="Nome da sua empresa"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ano de Nascimento *</Text>
              <TextInput
                style={styles.input}
                value={formData.anoNascimento}
                onChangeText={(value) => updateFormData('anoNascimento', value)}
                placeholder="AAAA"
                placeholderTextColor={Colors.text.muted}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Localização *</Text>
              <TextInput
                style={styles.input}
                value={formData.local}
                onChangeText={(value) => updateFormData('local', value)}
                placeholder="Cidade, Estado"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Marcas/Empresas que representa</Text>
              <TextInput
                style={styles.textArea}
                value={formData.marcas}
                onChangeText={(value) => updateFormData('marcas', value)}
                placeholder="Liste as marcas e empresas"
                placeholderTextColor={Colors.text.muted}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Faturamento</Text>
              <View style={styles.radioGroup}>
                {faturamentoOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.radioOption}
                    onPress={() => updateFormData('faturamento', option)}
                  >
                    <View style={[
                      styles.radioCircle,
                      formData.faturamento === option && styles.radioSelected
                    ]} />
                    <Text style={styles.radioText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tempo de Atuação</Text>
              <TextInput
                style={styles.input}
                value={formData.tempoAtuacao}
                onChangeText={(value) => updateFormData('tempoAtuacao', value)}
                placeholder="Ex: 10 anos"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Principais Resultados</Text>
              <TextInput
                style={styles.textArea}
                value={formData.principaisResultados}
                onChangeText={(value) => updateFormData('principaisResultados', value)}
                placeholder="Descreva seus principais resultados e conquistas"
                placeholderTextColor={Colors.text.muted}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Possui Filhos?</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => updateFormData('possuiFilhos', true)}
                >
                  <View style={[
                    styles.radioCircle,
                    formData.possuiFilhos === true && styles.radioSelected
                  ]} />
                  <Text style={styles.radioText}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => updateFormData('possuiFilhos', false)}
                >
                  <View style={[
                    styles.radioCircle,
                    formData.possuiFilhos === false && styles.radioSelected
                  ]} />
                  <Text style={styles.radioText}>Não</Text>
                </TouchableOpacity>
              </View>
              {formData.possuiFilhos === true && (
                <View style={{ marginTop: 8 }}>
                  <Text style={styles.label}>Quantidade de Filhos</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.quantidadeFilhos}
                    onChangeText={(value) => updateFormData('quantidadeFilhos', value)}
                    placeholder="Informe a quantidade"
                    placeholderTextColor={Colors.text.muted}
                    keyboardType="numeric"
                  />
                </View>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Formação Acadêmica</Text>
              <TextInput
                style={styles.input}
                value={formData.formacaoAcademica}
                onChangeText={(value) => updateFormData('formacaoAcademica', value)}
                placeholder="Informe sua formação acadêmica"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Hobby</Text>
              <TextInput
                style={styles.input}
                value={formData.hobby}
                onChangeText={(value) => updateFormData('hobby', value)}
                placeholder="Seus hobbies e interesses"
                placeholderTextColor={Colors.text.muted}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                placeholder="seu@email.com"
                placeholderTextColor={Colors.text.muted}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Instagram</Text>
              <TextInput
                style={styles.input}
                value={formData.instagram}
                onChangeText={(value) => updateFormData('instagram', value)}
                placeholder="@seuperfil"
                placeholderTextColor={Colors.text.muted}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>LinkedIn</Text>
              <TextInput
                style={styles.input}
                value={formData.linkedin}
                onChangeText={(value) => updateFormData('linkedin', value)}
                placeholder="linkedin.com/in/seuperfil"
                placeholderTextColor={Colors.text.muted}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Site</Text>
              <TextInput
                style={styles.input}
                value={formData.site}
                onChangeText={(value) => updateFormData('site', value)}
                placeholder="www.seusite.com"
                placeholderTextColor={Colors.text.muted}
                autoCapitalize="none"
              />
            </View> */}

            {/* <View style={styles.inputContainer}>
              <Text style={styles.label}>Já fechou negócio através de indicação?</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => updateFormData('fechou', true)}
                >
                  <View style={[
                    styles.radioCircle,
                    formData.fechou === true && styles.radioSelected
                  ]} />
                  <Text style={styles.radioText}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => updateFormData('fechou', false)}
                >
                  <View style={[
                    styles.radioCircle,
                    formData.fechou === false && styles.radioSelected
                  ]} />
                  <Text style={styles.radioText}>Não</Text>
                </TouchableOpacity>
              </View>
            </View> */}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Enviar Cadastro</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.replace('/login')}
            >
              <Text style={styles.backButtonText}>Voltar ao Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  title: {
    fontFamily: Typography.fonts.titleBold,
    fontSize: Typography.sizes.title,
    color: Colors.accent,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.lg,
    color: Colors.text.muted,
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.sm,
    color: Colors.text.primary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: Colors.background.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
  },
  textArea: {
    backgroundColor: Colors.background.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
    textAlignVertical: 'top',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  radioText: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.md,
    color: Colors.text.primary,
  },
  submitButton: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButtonText: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.sizes.lg,
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  backButtonText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.sizes.md,
    color: Colors.accent,
  },
});