import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { COLORS, Producto, ItemCarrito, Usuario } from '../../domain/entities/types';

// ─── Carrito ───────────────────────────────────────────────────────────────────
export function PantallaCarrito({
  carrito, onActualizarCantidad, onEliminar, onProductoSelect,
}: {
  carrito: ItemCarrito[];
  onActualizarCantidad: (id: number, d: number) => void;
  onEliminar: (id: number) => void;
  onProductoSelect: (p: Producto) => void;
}) {
  const subtotal = carrito.reduce((s, c) => s + c.producto.precio * c.cantidad, 0);
  const envio    = subtotal > 3000 ? 0 : 150;
  const total    = subtotal + envio;

  return (
    <View style={c.container}>
      <View style={c.header}>
        <Text style={c.titulo}>Mi Carrito</Text>
        <View style={c.countBadge}>
          <Text style={c.countText}>{carrito.length} artículo{carrito.length !== 1 ? 's' : ''}</Text>
        </View>
      </View>

      {carrito.length === 0 ? (
        <View style={c.empty}>
          <Text style={{ fontSize: 48, marginBottom: 16 }}>🛒</Text>
          <Text style={c.emptyTitle}>Carrito vacío</Text>
          <Text style={c.emptyHint}>Usa el ChatBot para encontrar lo que buscas</Text>
        </View>
      ) : (
        <>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 12 }}>
            {carrito.map(({ producto, cantidad }) => (
              <View key={producto.id} style={c.item}>
                <TouchableOpacity onPress={() => onProductoSelect(producto)} style={c.itemImg}>
                  <Image source={{ uri: producto.imagen }} style={{ width: '100%', height: '100%' }} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text style={c.itemCat}>{producto.categoria}</Text>
                  <Text style={c.itemNombre} numberOfLines={2}>{producto.nombre}</Text>
                  <Text style={c.itemPrecio}>C${(producto.precio * cantidad).toLocaleString()}</Text>
                </View>
                <View style={c.itemActions}>
                  <TouchableOpacity onPress={() => onEliminar(producto.id)}>
                    <Text style={{ color: '#EF5350', fontSize: 16 }}>🗑</Text>
                  </TouchableOpacity>
                  <View style={c.counter}>
                    <TouchableOpacity onPress={() => onActualizarCantidad(producto.id, -1)} style={c.counterBtn}>
                      <Text style={c.counterBtnText}>−</Text>
                    </TouchableOpacity>
                    <Text style={c.counterNum}>{cantidad}</Text>
                    <TouchableOpacity onPress={() => onActualizarCantidad(producto.id, 1)} style={c.counterBtn}>
                      <Text style={c.counterBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            {subtotal < 3000 && (
              <View style={c.freeShipBanner}>
                <Text style={{ fontSize: 14, marginRight: 8 }}>📦</Text>
                <Text style={c.freeShipText}>
                  Agrega <Text style={{ color: COLORS.primary, fontWeight: '700' }}>C${(3000 - subtotal).toLocaleString()}</Text> más para envío gratis
                </Text>
              </View>
            )}
          </ScrollView>

          <View style={c.footer}>
            <View style={c.resumen}>
              <View style={c.resumenRow}><Text style={c.resumenLabel}>Subtotal</Text><Text style={c.resumenVal}>C${subtotal.toLocaleString()}</Text></View>
              <View style={c.resumenRow}><Text style={c.resumenLabel}>Envío</Text><Text style={[c.resumenVal, envio === 0 && { color: '#34D399' }]}>{envio === 0 ? 'Gratis' : `C$${envio}`}</Text></View>
              <View style={[c.resumenRow, { borderTopWidth: 1, borderTopColor: COLORS.borderMuted, paddingTop: 10 }]}>
                <Text style={[c.resumenLabel, { color: COLORS.text, fontWeight: '700', fontSize: 14 }]}>Total</Text>
                <Text style={c.totalText}>C${total.toLocaleString()}</Text>
              </View>
            </View>
            <TouchableOpacity style={c.pagarBtn}>
              <Text style={c.pagarBtnText}>⚡  Pagar · C${total.toLocaleString()}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

// ─── Perfil ────────────────────────────────────────────────────────────────────
export function PantallaPerfil({ usuario, onLogout }: { usuario: Usuario | null; onLogout: () => void }) {
  const iniciales = usuario ? usuario.nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??';
  const stats = [
    { label: 'Pedidos', valor: '18', emoji: '📦' },
    { label: 'Reseñas', valor: '9',  emoji: '⭐' },
    { label: 'Puntos',  valor: '2.8K', emoji: '🏆' },
    { label: 'Ahorros', valor: 'C$4K', emoji: '📈' },
  ];
  const menu = [
    { emoji: '📦', label: 'Mis Pedidos',      sub: '18 pedidos en total' },
    { emoji: '🤍', label: 'Lista de Deseos',  sub: '6 productos guardados' },
    { emoji: '🔒', label: 'Privacidad',        sub: 'Administra tus datos' },
    { emoji: '🔔', label: 'Notificaciones',    sub: 'Personalizar alertas' },
    { emoji: '⚙️', label: 'Configuración',    sub: 'Preferencias de la app' },
    { emoji: '🚪', label: 'Cerrar Sesión',     sub: '', peligro: true, accion: onLogout },
  ];

  return (
    <ScrollView style={p.container} showsVerticalScrollIndicator={false}>
      {/* Hero perfil */}
      <View style={p.hero}>
        <View style={p.avatarWrap}>
          <Text style={p.avatarText}>{iniciales}</Text>
          <View style={p.verifiedBadge}><Text style={{ fontSize: 9 }}>✓</Text></View>
        </View>
        <View>
          <Text style={p.nombre}>{usuario?.nombre ?? 'Invitado'}</Text>
          <Text style={p.email}>{usuario?.email ?? 'Sin cuenta'}</Text>
          <View style={p.proBadge}>
            <Text style={p.proBadgeText}>{usuario ? 'Miembro Pro Eccommerce' : 'Cuenta de invitado'}</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={p.statsRow}>
        {stats.map(st => (
          <View key={st.label} style={p.statCard}>
            <Text style={{ fontSize: 18, marginBottom: 4 }}>{st.emoji}</Text>
            <Text style={p.statVal}>{st.valor}</Text>
            <Text style={p.statLabel}>{st.label}</Text>
          </View>
        ))}
      </View>

      {/* Puntos */}
      <View style={p.puntosCard}>
        <View style={p.puntosRow}>
          <View>
            <Text style={p.puntosSub}>ECCOMMERCE PUNTOS</Text>
            <Text style={p.puntosNivel}>Nivel Oro 🏆</Text>
          </View>
        </View>
        <View style={p.progressRow}>
          <Text style={p.progressText}>2,800 / 5,000 pts para Platino</Text>
          <Text style={[p.progressText, { color: COLORS.primary }]}>56%</Text>
        </View>
        <View style={p.progressBg}>
          <View style={p.progressFill} />
        </View>
      </View>

      {/* Menú */}
      <View style={p.menuCard}>
        {menu.map((item, i) => (
          <TouchableOpacity
            key={item.label}
            onPress={(item as any).accion}
            style={[p.menuItem, i !== menu.length - 1 && { borderBottomWidth: 1, borderBottomColor: COLORS.borderMuted }]}
          >
            <Text style={{ fontSize: 18, marginRight: 12 }}>{item.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[p.menuLabel, (item as any).peligro && { color: '#EF5350' }]}>{item.label}</Text>
              {!!item.sub && <Text style={p.menuSub}>{item.sub}</Text>}
            </View>
            {!(item as any).peligro && <Text style={{ color: COLORS.textMuted, fontSize: 16 }}>›</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// ─── Styles Carrito ────────────────────────────────────────────────────────────
const c = StyleSheet.create({
  container:      { flex: 1, backgroundColor: COLORS.bg },
  header:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, backgroundColor: COLORS.bgCard, borderBottomWidth: 1, borderBottomColor: COLORS.borderMuted },
  titulo:         { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  countBadge:     { backgroundColor: '#1a2535', borderRadius: 20, borderWidth: 1, borderColor: COLORS.borderMuted, paddingHorizontal: 12, paddingVertical: 4 },
  countText:      { color: COLORS.textMuted, fontSize: 12 },
  empty:          { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emptyTitle:     { color: COLORS.text, fontSize: 16, fontWeight: '700', marginBottom: 8 },
  emptyHint:      { color: COLORS.textMuted, fontSize: 13, textAlign: 'center' },
  item:           { flexDirection: 'row', gap: 12, padding: 12, backgroundColor: COLORS.bgCard, borderRadius: 18, borderWidth: 1, borderColor: COLORS.borderMuted },
  itemImg:        { width: 64, height: 64, borderRadius: 12, overflow: 'hidden', backgroundColor: '#0F1E35' },
  itemCat:        { color: COLORS.primary, fontSize: 10, fontWeight: '600', marginBottom: 2 },
  itemNombre:     { color: COLORS.text, fontSize: 12, fontWeight: '600', lineHeight: 15, marginBottom: 4 },
  itemPrecio:     { color: COLORS.primary, fontSize: 12, fontWeight: '700' },
  itemActions:    { alignItems: 'flex-end', justifyContent: 'space-between' },
  counter:        { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0A0A0A', borderRadius: 10, borderWidth: 1, borderColor: COLORS.borderMuted, overflow: 'hidden' },
  counterBtn:     { paddingHorizontal: 10, paddingVertical: 6 },
  counterBtnText: { color: COLORS.textMuted, fontSize: 14, fontWeight: '700' },
  counterNum:     { color: COLORS.text, fontSize: 12, fontWeight: '700', width: 20, textAlign: 'center' },
  freeShipBanner: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, backgroundColor: 'rgba(0,191,255,0.05)' },
  freeShipText:   { color: COLORS.text, fontSize: 12, flex: 1 },
  footer:         { padding: 16, borderTopWidth: 1, borderTopColor: COLORS.borderMuted, backgroundColor: COLORS.bgCard },
  resumen:        { gap: 8, marginBottom: 16 },
  resumenRow:     { flexDirection: 'row', justifyContent: 'space-between' },
  resumenLabel:   { color: COLORS.textMuted, fontSize: 13 },
  resumenVal:     { color: COLORS.text, fontSize: 13, fontWeight: '600' },
  totalText:      { color: COLORS.primary, fontSize: 18, fontWeight: '700' },
  pagarBtn:       { paddingVertical: 16, borderRadius: 18, backgroundColor: COLORS.primary, alignItems: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.4, shadowRadius: 12, elevation: 6 },
  pagarBtnText:   { color: '#fff', fontWeight: '700', fontSize: 15 },
});

// ─── Styles Perfil ─────────────────────────────────────────────────────────────
const p = StyleSheet.create({
  container:    { flex: 1, backgroundColor: COLORS.bg },
  hero:         { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 20, paddingTop: 28, backgroundColor: COLORS.bgCard, borderBottomWidth: 1, borderBottomColor: COLORS.borderMuted },
  avatarWrap:   { width: 64, height: 64, borderRadius: 18, backgroundColor: '#0F1E35', borderWidth: 2, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  avatarText:   { color: COLORS.primary, fontSize: 22, fontWeight: '700' },
  verifiedBadge:{ position: 'absolute', bottom: -4, right: -4, width: 18, height: 18, borderRadius: 9, backgroundColor: COLORS.primary, borderWidth: 2, borderColor: COLORS.bg, alignItems: 'center', justifyContent: 'center' },
  nombre:       { color: COLORS.text, fontSize: 15, fontWeight: '700', marginBottom: 2 },
  email:        { color: COLORS.textMuted, fontSize: 12, marginBottom: 6 },
  proBadge:     { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, backgroundColor: 'rgba(0,191,255,0.08)', borderWidth: 1, borderColor: COLORS.border },
  proBadgeText: { color: COLORS.primary, fontSize: 10, fontWeight: '600' },
  statsRow:     { flexDirection: 'row', gap: 10, padding: 16 },
  statCard:     { flex: 1, backgroundColor: COLORS.bgCard, borderRadius: 16, borderWidth: 1, borderColor: COLORS.borderMuted, padding: 12, alignItems: 'center' },
  statVal:      { color: COLORS.text, fontSize: 13, fontWeight: '700', marginBottom: 2 },
  statLabel:    { color: COLORS.textMuted, fontSize: 9, textAlign: 'center' },
  puntosCard:   { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 18, backgroundColor: COLORS.bgCard, borderWidth: 1, borderColor: COLORS.border },
  puntosRow:    { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  puntosSub:    { color: COLORS.primary, fontSize: 9, fontWeight: '700', letterSpacing: 1.5, marginBottom: 4 },
  puntosNivel:  { color: COLORS.text, fontSize: 14, fontWeight: '600' },
  progressRow:  { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressText: { color: COLORS.textMuted, fontSize: 11 },
  progressBg:   { height: 6, borderRadius: 3, backgroundColor: '#1a2535', overflow: 'hidden' },
  progressFill: { height: '100%', width: '56%', borderRadius: 3, backgroundColor: COLORS.primary },
  menuCard:     { marginHorizontal: 16, marginBottom: 24, backgroundColor: COLORS.bgCard, borderRadius: 18, borderWidth: 1, borderColor: COLORS.borderMuted, overflow: 'hidden' },
  menuItem:     { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  menuLabel:    { color: COLORS.text, fontSize: 14, fontWeight: '500', marginBottom: 1 },
  menuSub:      { color: COLORS.textMuted2, fontSize: 10 },
});
