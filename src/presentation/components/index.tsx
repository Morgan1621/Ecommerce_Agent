import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, Producto } from '../../domain/entities/types';

// ── Badge ─────────────────────────────────────────────────────────────────────
export function BadgePill({ texto }: { texto: string }) {
  const estilos: Record<string, { bg: string; color: string; border: string }> = {
    'Más vendido': { bg: 'rgba(251,191,36,0.15)', color: '#FBBF24', border: 'rgba(251,191,36,0.3)' },
    'Oferta':      { bg: 'rgba(229,57,53,0.15)',  color: '#EF5350', border: 'rgba(229,57,53,0.3)' },
    'Nuevo':       { bg: 'rgba(52,211,153,0.15)', color: '#34D399', border: 'rgba(52,211,153,0.3)' },
    'Top':         { bg: 'rgba(0,191,255,0.15)',  color: '#00BFFF', border: 'rgba(0,191,255,0.3)' },
  };
  const e = estilos[texto] ?? { bg: '#1a1a1a', color: '#888', border: '#333' };
  return (
    <View style={[s.badge, { backgroundColor: e.bg, borderColor: e.border }]}>
      <Text style={[s.badgeText, { color: e.color }]}>{texto}</Text>
    </View>
  );
}

// ── Estrellas ──────────────────────────────────────────────────────────────────
export function Estrellas({ rating }: { rating: number }) {
  return (
    <View style={s.starsRow}>
      {[1, 2, 3, 4, 5].map(i => (
        <Text key={i} style={{ color: i <= Math.round(rating) ? '#FBBF24' : '#2a3a4a', fontSize: 9 }}>★</Text>
      ))}
    </View>
  );
}

// ── Tarjeta Producto (grid) ────────────────────────────────────────────────────
export function TarjetaProducto({
  producto, onPress, enCarrito, onAgregar,
}: {
  producto: Producto;
  onPress: () => void;
  enCarrito: boolean;
  onAgregar: () => void;
}) {
  const dto = Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={s.card}>
      <View style={s.cardImgWrap}>
        <Image source={{ uri: producto.imagen }} style={s.cardImg} />
        <View style={s.cardImgOverlay} />
        {producto.badge && (
          <View style={s.cardBadge}><BadgePill texto={producto.badge} /></View>
        )}
        {dto > 0 && (
          <View style={s.cardDto}>
            <Text style={s.cardDtoText}>-{dto}%</Text>
          </View>
        )}
      </View>
      <View style={s.cardBody}>
        <Text style={s.cardNombre} numberOfLines={2}>{producto.nombre}</Text>
        <View style={s.cardFooter}>
          <View>
            <Text style={s.cardPrecio}>C${producto.precio.toLocaleString()}</Text>
            <Text style={s.cardPrecioOrig}>C${producto.precioOriginal.toLocaleString()}</Text>
          </View>
          <TouchableOpacity onPress={onAgregar} style={[s.cardBtn, enCarrito && s.cardBtnActive]}>
            <Text style={{ color: enCarrito ? COLORS.primary : COLORS.textMuted, fontSize: 16 }}>
              {enCarrito ? '✓' : '+'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ── Tarjeta Producto Chat (lista) ──────────────────────────────────────────────
export function TarjetaChatProducto({
  producto, onPress, enCarrito, onAgregar,
}: {
  producto: Producto;
  onPress: () => void;
  enCarrito: boolean;
  onAgregar: () => void;
}) {
  const dto = Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={s.chatCard}>
      <Image source={{ uri: producto.imagen }} style={s.chatCardImg} />
      <View style={s.chatCardBody}>
        <Text style={s.chatCardNombre} numberOfLines={2}>{producto.nombre}</Text>
        <View style={s.chatCardRow}>
          <Text style={s.chatCardPrecio}>C${producto.precio.toLocaleString()}</Text>
          {dto > 0 && <Text style={s.chatCardDto}>-{dto}%</Text>}
        </View>
        <View style={s.starsRow}>
          <Estrellas rating={producto.rating} />
          <Text style={s.chatCardResenas}> ({producto.resenas.toLocaleString()})</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onAgregar} style={[s.chatCardBtn, enCarrito && s.cardBtnActive]}>
        <Text style={{ color: enCarrito ? COLORS.primary : COLORS.textMuted, fontSize: 16 }}>
          {enCarrito ? '✓' : '+'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

// ── Nav Inferior ───────────────────────────────────────────────────────────────
export function NavInferior({
  activo, onCambioTab, cantCarrito,
}: {
  activo: string;
  onCambioTab: (t: any) => void;
  cantCarrito: number;
}) {
  const tabs = [
    { id: 'tienda',  emoji: '🏪', label: 'Tienda'  },
    { id: 'chatbot', emoji: '🤖', label: 'ChatBot' },
    { id: 'carrito', emoji: '🛒', label: 'Carrito' },
    { id: 'perfil',  emoji: '👤', label: 'Perfil'  },
  ];
  return (
    <View style={s.nav}>
      {tabs.map(tab => {
        const es = activo === tab.id;
        return (
          <TouchableOpacity key={tab.id} onPress={() => onCambioTab(tab.id)} style={s.navItem}>
            <View style={s.navIconWrap}>
              <Text style={[s.navEmoji, { opacity: es ? 1 : 0.4 }]}>{tab.emoji}</Text>
              {tab.id === 'carrito' && cantCarrito > 0 && (
                <View style={s.navBadge}>
                  <Text style={s.navBadgeText}>{cantCarrito > 9 ? '9+' : cantCarrito}</Text>
                </View>
              )}
            </View>
            <Text style={[s.navLabel, { color: es ? COLORS.primary : COLORS.textMuted2 }]}>{tab.label}</Text>
            {es && <View style={s.navDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  // Badge
  badge:     { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 20, borderWidth: 1 },
  badgeText: { fontSize: 9, fontWeight: '700' },
  // Stars
  starsRow:  { flexDirection: 'row', alignItems: 'center', gap: 1 },
  // Card
  card:          { backgroundColor: '#0D1525', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(0,191,255,0.1)', overflow: 'hidden' },
  cardImgWrap:   { aspectRatio: 1, position: 'relative' },
  cardImg:       { width: '100%', height: '100%' },
  cardImgOverlay:{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(10,22,40,0.4)' },
  cardBadge:     { position: 'absolute', top: 6, left: 6 },
  cardDto:       { position: 'absolute', top: 6, right: 6, backgroundColor: '#E53935', borderRadius: 20, paddingHorizontal: 5, paddingVertical: 2 },
  cardDtoText:   { color: '#fff', fontSize: 9, fontWeight: '700' },
  cardBody:      { padding: 10 },
  cardNombre:    { color: '#E8EDF5', fontSize: 11, fontWeight: '500', lineHeight: 15, marginBottom: 8 },
  cardFooter:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardPrecio:    { color: '#00BFFF', fontSize: 11, fontWeight: '700' },
  cardPrecioOrig:{ color: '#5A7A9A', fontSize: 9, textDecorationLine: 'line-through' },
  cardBtn:       { padding: 6, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', backgroundColor: '#0F1E35' },
  cardBtnActive: { backgroundColor: 'rgba(0,191,255,0.15)', borderColor: 'rgba(0,191,255,0.4)' },
  // Chat card
  chatCard:      { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(0,191,255,0.1)', backgroundColor: '#0a1628' },
  chatCardImg:   { width: 56, height: 56, borderRadius: 10 },
  chatCardBody:  { flex: 1, gap: 3 },
  chatCardNombre:{ color: '#E8EDF5', fontSize: 11, fontWeight: '600', lineHeight: 14 },
  chatCardRow:   { flexDirection: 'row', alignItems: 'center', gap: 6 },
  chatCardPrecio:{ color: '#00BFFF', fontSize: 10, fontWeight: '700' },
  chatCardDto:   { color: '#EF5350', fontSize: 9, fontWeight: '700' },
  chatCardResenas:{ color: '#5A7A9A', fontSize: 9 },
  chatCardBtn:   { padding: 6, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', backgroundColor: '#0A0A0A' },
  // Nav
  nav:         { flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(0,191,255,0.1)', backgroundColor: '#0D1525', paddingTop: 8, paddingBottom: 16, paddingHorizontal: 8 },
  navItem:     { flex: 1, alignItems: 'center', gap: 3, position: 'relative' },
  navIconWrap: { position: 'relative' },
  navEmoji:    { fontSize: 20 },
  navBadge:    { position: 'absolute', top: -4, right: -8, backgroundColor: '#00BFFF', borderRadius: 10, minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  navBadgeText:{ color: '#fff', fontSize: 9, fontWeight: '700' },
  navLabel:    { fontSize: 9, fontWeight: '600' },
  navDot:      { position: 'absolute', bottom: -6, width: 16, height: 2, borderRadius: 2, backgroundColor: '#00BFFF' },
});
