import { useState } from 'react';
import {
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, Usuario } from '../../domain/entities/types';

export function PantallaLogin({
  onLogin, onIrRegistro, onContinuarSinCuenta, usuarios,
}: {
  onLogin: (u: Usuario) => void;
  onIrRegistro: () => void;
  onContinuarSinCuenta: () => void;
  usuarios: Usuario[];
}) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [verPass, setVerPass]   = useState(false);
  const [error, setError]       = useState('');
  const [cargando, setCargando] = useState(false);

  function intentarLogin() {
    if (!email.trim() || !password.trim()) { setError('Por favor completa todos los campos.'); return; }
    setCargando(true); setError('');
    setTimeout(() => {
      const u = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (u) { onLogin(u); }
      else { setError('Email o contraseña incorrectos.'); setCargando(false); }
    }, 800);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">

        {/* Glow decorativo */}
        <View style={s.glow} pointerEvents="none" />

        {/* Logo */}
        <View style={s.logoArea}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>🤖</Text>
          </View>
          <Text style={s.titulo}><Text style={{ color: COLORS.primary }}>Ecc</Text>ommerce</Text>
          <Text style={s.subtitulo}>Iniciar sesión</Text>
          <Text style={s.hint}>Ingresa a tu cuenta para continuar</Text>
        </View>

        {/* Formulario */}
        <View style={s.card}>
          <Text style={s.label}>Email</Text>
          <TextInput
            style={s.input}
            value={email}
            onChangeText={setEmail}
            placeholder="tu@email.com"
            placeholderTextColor={COLORS.textMuted2}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[s.label, { marginTop: 14 }]}>Contraseña</Text>
          <View style={s.passWrap}>
            <TextInput
              style={[s.input, { flex: 1, borderWidth: 0, paddingRight: 40 }]}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={COLORS.textMuted2}
              secureTextEntry={!verPass}
            />
            <TouchableOpacity onPress={() => setVerPass(!verPass)} style={s.eyeBtn}>
              <Text style={{ color: COLORS.textMuted, fontSize: 16 }}>{verPass ? '🙈' : '👁'}</Text>
            </TouchableOpacity>
          </View>

          {!!error && <Text style={s.error}>{error}</Text>}

          <TouchableOpacity style={s.btnPrimary} onPress={intentarLogin} disabled={cargando} activeOpacity={0.85}>
            {cargando
              ? <ActivityIndicator color="#fff" size="small" />
              : <Text style={s.btnPrimaryText}>🔑  Iniciar sesión</Text>}
          </TouchableOpacity>

          <View style={s.divider}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>o</Text>
            <View style={s.dividerLine} />
          </View>

          <TouchableOpacity style={s.btnSecondary} onPress={onIrRegistro} activeOpacity={0.85}>
            <Text style={s.btnSecondaryText}>👤  Crear cuenta nueva</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onContinuarSinCuenta} style={s.skipBtn}>
          <Text style={s.skipText}>Continuar sin cuenta</Text>
        </TouchableOpacity>

        <Text style={s.demoHint}>Demo: jordan@eccommerce.com / demo123</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container:      { flexGrow: 1, justifyContent: 'center', padding: 24, backgroundColor: COLORS.bg },
  glow:           { position: 'absolute', top: '20%', left: '50%', marginLeft: -128, width: 256, height: 256, borderRadius: 128, backgroundColor: 'rgba(0,191,255,0.06)' },
  logoArea:       { alignItems: 'center', marginBottom: 28 },
  avatar:         { width: 80, height: 80, borderRadius: 20, backgroundColor: '#0D1525', borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  avatarText:     { fontSize: 36 },
  titulo:         { fontSize: 24, fontWeight: '900', color: COLORS.text, letterSpacing: 1, marginBottom: 4 },
  subtitulo:      { fontSize: 14, color: COLORS.textMuted, marginBottom: 4 },
  hint:           { fontSize: 11, color: COLORS.textMuted2 },
  card:           { backgroundColor: COLORS.bgCard, borderRadius: 24, borderWidth: 1, borderColor: COLORS.borderMuted, padding: 20, marginBottom: 16 },
  label:          { color: COLORS.textMuted, fontSize: 12, fontWeight: '500', marginBottom: 6 },
  input:          { backgroundColor: '#0A0A0A', borderRadius: 12, borderWidth: 1, borderColor: COLORS.borderMuted, paddingHorizontal: 14, paddingVertical: 12, color: COLORS.text, fontSize: 14 },
  passWrap:       { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0A0A0A', borderRadius: 12, borderWidth: 1, borderColor: COLORS.borderMuted, paddingHorizontal: 14 },
  eyeBtn:         { padding: 4 },
  error:          { color: '#EF5350', fontSize: 12, textAlign: 'center', marginTop: 8 },
  btnPrimary:     { marginTop: 16, paddingVertical: 14, borderRadius: 14, backgroundColor: COLORS.primary, alignItems: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.4, shadowRadius: 12, elevation: 6 },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  divider:        { flexDirection: 'row', alignItems: 'center', marginVertical: 14 },
  dividerLine:    { flex: 1, height: 1, backgroundColor: COLORS.borderMuted },
  dividerText:    { color: COLORS.textMuted2, fontSize: 11, marginHorizontal: 10 },
  btnSecondary:   { paddingVertical: 12, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', backgroundColor: 'rgba(0,191,255,0.05)' },
  btnSecondaryText:{ color: COLORS.primary, fontWeight: '600', fontSize: 14 },
  skipBtn:        { alignItems: 'center', paddingVertical: 10 },
  skipText:       { color: COLORS.textMuted2, fontSize: 12 },
  demoHint:       { color: COLORS.textMuted2, fontSize: 10, textAlign: 'center', marginTop: 4, opacity: 0.6 },
});
