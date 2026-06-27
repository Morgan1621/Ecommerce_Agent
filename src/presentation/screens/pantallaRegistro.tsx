import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { COLORS, Usuario } from '../../domain/entities/types';

export function PantallaRegistro({
  onRegistro, onIrLogin, onContinuarSinCuenta,
}: {
  onRegistro: (u: Usuario) => void;
  onIrLogin: () => void;
  onContinuarSinCuenta: () => void;
}) {
  const [nombre, setNombre]     = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [verPass, setVerPass]   = useState(false);
  const [error, setError]       = useState('');
  const [cargando, setCargando] = useState(false);

  function intentarRegistro() {
    if (!nombre.trim() || !email.trim() || !password.trim()) { setError('Por favor completa todos los campos.'); return; }
    if (!email.includes('@')) { setError('Ingresa un email válido.'); return; }
    if (password.length < 6)  { setError('La contraseña debe tener al menos 6 caracteres.'); return; }
    setCargando(true); setError('');
    setTimeout(() => { onRegistro({ nombre: nombre.trim(), email: email.trim().toLowerCase(), password }); }, 800);
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
          <Text style={s.titulo}><Text style={{ color: COLORS.primary }}>Ecc</Text>ommerce</Text>
          <Text style={s.subtitulo}>Crear cuenta</Text>
          <Text style={s.hint}>Crea una cuenta para guardar tus compras</Text>
        </View>

        {/* Formulario */}
        <View style={s.card}>
          <Text style={s.label}>Nombre completo</Text>
          <TextInput style={s.input} value={nombre} onChangeText={setNombre} placeholder="Tu nombre" placeholderTextColor={COLORS.textMuted2} autoCapitalize="words" />

          <Text style={[s.label, { marginTop: 14 }]}>Email</Text>
          <TextInput style={s.input} value={email} onChangeText={setEmail} placeholder="tu@email.com" placeholderTextColor={COLORS.textMuted2} keyboardType="email-address" autoCapitalize="none" />

          <Text style={[s.label, { marginTop: 14 }]}>Contraseña</Text>
          <View style={s.passWrap}>
            <TextInput
              style={[s.input, { flex: 1, borderWidth: 0, paddingRight: 40 }]}
              value={password} onChangeText={setPassword}
              placeholder="Mínimo 6 caracteres" placeholderTextColor={COLORS.textMuted2}
              secureTextEntry={!verPass}
            />
            <TouchableOpacity onPress={() => setVerPass(!verPass)} style={s.eyeBtn}>
              <Text style={{ color: COLORS.textMuted, fontSize: 16 }}>{verPass ? '🙈' : '👁'}</Text>
            </TouchableOpacity>
          </View>

          {!!error && <Text style={s.error}>{error}</Text>}

          <TouchableOpacity style={s.btnPrimary} onPress={intentarRegistro} disabled={cargando} activeOpacity={0.85}>
            {cargando
              ? <ActivityIndicator color="#fff" size="small" />
              : <Text style={s.btnPrimaryText}>👤  Registrarse</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={s.btnSecondary} onPress={onIrLogin} activeOpacity={0.85}>
            <Text style={s.btnSecondaryText}>¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onContinuarSinCuenta} style={s.skipBtn}>
          <Text style={s.skipText}>Continuar sin cuenta</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container:       { flexGrow: 1, justifyContent: 'center', padding: 24, backgroundColor: COLORS.bg },
  glow:            { position: 'absolute', top: '20%', left: '50%', marginLeft: -128, width: 256, height: 256, borderRadius: 128, backgroundColor: 'rgba(0,191,255,0.06)' },
  logoArea:        { alignItems: 'center', marginBottom: 24 },
  avatar:          { width: 70, height: 70, borderRadius: 18, backgroundColor: '#0D1525', borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  avatarText:      { fontSize: 32 },
  titulo:          { fontSize: 22, fontWeight: '900', color: COLORS.text, letterSpacing: 1, marginBottom: 4 },
  subtitulo:       { fontSize: 14, color: COLORS.textMuted, marginBottom: 4 },
  hint:            { fontSize: 11, color: COLORS.textMuted2 },
  card:            { backgroundColor: COLORS.bgCard, borderRadius: 24, borderWidth: 1, borderColor: COLORS.borderMuted, padding: 20, marginBottom: 16, gap: 2 },
  label:           { color: COLORS.textMuted, fontSize: 12, fontWeight: '500', marginBottom: 6 },
  input:           { backgroundColor: '#0A0A0A', borderRadius: 12, borderWidth: 1, borderColor: COLORS.borderMuted, paddingHorizontal: 14, paddingVertical: 12, color: COLORS.text, fontSize: 14 },
  passWrap:        { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0A0A0A', borderRadius: 12, borderWidth: 1, borderColor: COLORS.borderMuted, paddingHorizontal: 14 },
  eyeBtn:          { padding: 4 },
  error:           { color: '#EF5350', fontSize: 12, textAlign: 'center', marginTop: 8 },
  btnPrimary:      { marginTop: 16, paddingVertical: 14, borderRadius: 14, backgroundColor: COLORS.primary, alignItems: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.4, shadowRadius: 12, elevation: 6 },
  btnPrimaryText:  { color: '#fff', fontWeight: '700', fontSize: 14 },
  btnSecondary:    { marginTop: 10, paddingVertical: 12, borderRadius: 14, borderWidth: 1, borderColor: COLORS.borderMuted, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' },
  btnSecondaryText:{ color: COLORS.textMuted, fontWeight: '600', fontSize: 13 },
  skipBtn:         { alignItems: 'center', paddingVertical: 10 },
  skipText:        { color: COLORS.textMuted2, fontSize: 12 },
});
