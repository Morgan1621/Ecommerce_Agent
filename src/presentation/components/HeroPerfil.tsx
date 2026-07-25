import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, Usuario } from '../domain/entities/types';

type Props = { usuario: Usuario | null };

export function HeroPerfil({ usuario }: Props) {
  const iniciales = usuario ? usuario.nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??';

  return (
    <View style={s.hero}>
      <View style={s.avatarWrap}>
        <Text style={s.avatarText}>{iniciales}</Text>
        <View style={s.verifiedBadge}><Text style={{ fontSize: 9 }}>✓</Text></View>
      </View>
      <View>
        <Text style={s.nombre}>{usuario?.nombre ?? 'Invitado'}</Text>
        <Text style={s.email}>{usuario?.email ?? 'Sin cuenta'}</Text>
        <View style={s.proBadge}>
          <Text style={s.proBadgeText}>{usuario ? 'Miembro Pro Ecommerce' : 'Cuenta de invitado'}</Text>
        </View>
