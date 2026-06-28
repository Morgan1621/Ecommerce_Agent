import { useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS, Usuario } from '../../domain/entities/types';
import { BotonPrimario } from '../components/BotonPrimario';
import { CampoTexto } from '../components/CampoTexto';

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
  const [error, setError]       = useState('');
  const [cargando, setCargando] = useState(false);

  function intentarLogin() {
    if (!email.trim() || !password.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }
    setCargando(true);
    setError('');
    setTimeout(() => {
      const u = usuarios.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (u) { onLogin(u); }
      else   { setError('Email o contraseña incorrectos.'); setCargando(false); }
    }, 800);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">

        <View style={s.glow} pointerEvents="none" />

        {/* Logo */}
        <View style={s.logoArea}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>🤖</Text>
          </View>
          <Text style={s.titulo}>
            <Text style={{ color: COLORS.primary }}>Ecc</Text>ommerce
          </Text>
          <Text style={s.subtitulo}>Iniciar sesión</Text>
          <Text style={s.hint}>Ingresa a tu cuenta para continuar</Text>
        </View>

        {/* Formulario usando CampoTexto reutilizable */}
        <View style={s.card}>
          <CampoTexto
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="tu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CampoTexto
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            esPassword
            onSubmitEditing={intentarLogin}
          />

          {!!error && <Text style={s.error}>{error}</Text>}

          {/* Botones usando BotonPrimario reutilizable */}
          <BotonPrimario
            texto="Iniciar sesión"
            icono="🔑"
            onPress={intentarLogin}
            cargando={cargando}
            style={{ marginTop: 8 }}
          />

          <View style={s.divider}>
            <View style={s.dividerLine} />
            <Text style={s.dividerText}>o</Text>
            <View style={s.dividerLine} />
          </View>

          <BotonPrimario
            texto="Crear cuenta nueva"
            icono="👤"
            onPress={onIrRegistro}
            variante="secundario"
          />
        </View>

        <BotonPrimario
          texto="Continuar sin cuenta"
          onPress={onContinuarSinCuenta}
          variante="outline"
          style={{ marginHorizontal: 0, marginTop: 8 }}
        />

        <Text style={s.demoHint}>Demo: jordan@eccommerce.com / demo123</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, backgroundColor: COLORS.bg },
  glow:      { position: 'absolute', top: '20%', left: '50%', marginLeft: -128, width: 256, height: 256, borderRadius: 128, backgroundColor: 'rgba(0,191,255,0.06)' },
  logoArea:  { alignItems: 'center', marginBottom: 28 },
  avatar:    { width: 80, height: 80, borderRadius: 20, backgroundColor: '#0D1525', borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  avatarText:{ fontSize: 36 },
  titulo:    { fontSize: 24, fontWeight: '900', color: COLORS.text, letterSpacing: 1, marginBottom: 4 },
  subtitulo: { fontSize: 14, color: COLORS.textMuted, marginBottom: 4 },
  hint:      { fontSize: 11, color: COLORS.textMuted2 },
  card:      { backgroundColor: COLORS.bgCard, borderRadius: 24, borderWidth: 1, borderColor: COLORS.borderMuted, padding: 20, marginBottom: 16 },
  error:     { color: '#EF5350', fontSize: 12, textAlign: 'center', marginBottom: 8 },
  divider:   { flexDirection: 'row', alignItems: 'center', marginVertical: 14 },
  dividerLine:{ flex: 1, height: 1, backgroundColor: COLORS.borderMuted },
  dividerText:{ color: COLORS.textMuted2, fontSize: 11, marginHorizontal: 10 },
  demoHint:  { color: COLORS.textMuted2, fontSize: 10, textAlign: 'center', marginTop: 12, opacity: 0.6 },
});
