import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView, Platform,
  ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, ItemCarrito, MensajeChat, PRODUCTOS, Producto } from '../../domain/entities/types';
import { TarjetaChatProducto } from '../components';

function ahora() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function buscarProductos(q: string): Producto[] {
  const palabras = q.toLowerCase().split(/\s+/).filter(p => p.length > 1);
  return PRODUCTOS.filter(p => {
    const t = `${p.nombre} ${p.descripcion} ${p.tags.join(' ')}`.toLowerCase();
    return palabras.some(w => t.includes(w));
  }).slice(0, 4);
}

export function PantallaChatBot({
  onVerProducto, carrito, onAgregarCarrito,
}: {
  onVerProducto: (p: Producto) => void;
  carrito: ItemCarrito[];
  onAgregarCarrito: (p: Producto) => void;
}) {
  const [mensajes, setMensajes] = useState<MensajeChat[]>([
    { id: 1, rol: 'bot', hora: ahora(), texto: '¡Hola! Soy NexBot AI, el asistente inteligente de Eccommerce. Puedo ayudarte a buscar productos, comparar precios y más.' },
    { id: 2, rol: 'bot', hora: ahora(), texto: 'Escríbeme qué producto buscas. Por ejemplo: "RAM DDR5 32GB" o "mouse gaming".' },
  ]);
  const [entrada, setEntrada] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [mensajes, escribiendo]);

  function enviar(texto?: string) {
    const consulta = (texto ?? entrada).trim();
    if (!consulta) return;
    setMensajes(m => [...m, { id: Date.now(), rol: 'usuario', texto: consulta, hora: ahora() }]);
    if (!texto) setEntrada('');
    setEscribiendo(true);
    setTimeout(() => {
      const encontrados = buscarProductos(consulta);
      const respuesta = encontrados.length > 0
        ? `¡Encontré ${encontrados.length} opción(es) para "${consulta}"!`
        : 'No encontré productos exactos. ¿Puedes ser más específico? Ejemplo: "SSD NVMe 1TB" o "teclado mecánico".';
      setEscribiendo(false);
      setMensajes(m => [...m, { id: Date.now() + 1, rol: 'bot', texto: respuesta, hora: ahora(), productos: encontrados.length > 0 ? encontrados : undefined }]);
    }, 1200);
  }

  const sugerencias = ['RAM DDR5 32GB', 'RTX 4070', 'SSD NVMe', 'Laptop gaming', 'Mouse gaming'];

  return (
    <KeyboardAvoidingView style={s.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
      {/* Header */}
      <View style={s.header}>
        <View style={s.botAvatar}>
          <Text style={{ fontSize: 18 }}>🤖</Text>
          <View style={s.onlineDot} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.botNombre}>NexBot AI</Text>
          <Text style={s.botStatus}>Buscador inteligente · En línea</Text>
        </View>
      </View>

      {/* Mensajes */}
      <ScrollView ref={scrollRef} style={s.mensajesWrap} contentContainerStyle={s.mensajesContent} showsVerticalScrollIndicator={false}>
        {mensajes.map(m => (
          <View key={m.id}>
            <View style={[s.msgRow, m.rol === 'usuario' && s.msgRowUser]}>
              {m.rol === 'bot' && (
                <View style={s.msgAvatar}><Text style={{ fontSize: 12 }}>🤖</Text></View>
              )}
              <View style={{ maxWidth: '80%' }}>
                <View style={[s.bubble, m.rol === 'usuario' ? s.bubbleUser : s.bubbleBot]}>
                  <Text style={[s.bubbleText, m.rol === 'usuario' && { color: '#fff' }]}>{m.texto}</Text>
                </View>
                <Text style={s.hora}>{m.hora}</Text>
              </View>
            </View>

            {/* Productos en chat */}
            {m.productos && m.productos.length > 0 && (
              <View style={s.productosWrap}>
                {m.productos.map(p => (
                  <TarjetaChatProducto
                    key={p.id}
                    producto={p}
                    onPress={() => onVerProducto(p)}
                    enCarrito={carrito.some(c => c.producto.id === p.id)}
                    onAgregar={() => onAgregarCarrito(p)}
                  />
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Indicador de escritura */}
        {escribiendo && (
          <View style={s.msgRow}>
            <View style={s.msgAvatar}><Text style={{ fontSize: 12 }}>🤖</Text></View>
            <View style={[s.bubble, s.bubbleBot, { paddingVertical: 14 }]}>
              <Text style={{ color: COLORS.primary, letterSpacing: 4 }}>···</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Sugerencias */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.sugerenciasWrap} contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingVertical: 6 }}>
        {sugerencias.map(s2 => (
          <TouchableOpacity key={s2} onPress={() => enviar(s2)} style={s.sugerencia}>
            <Text style={s.sugerenciaText}>{s2}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={s.inputArea}>
        <TextInput
          style={s.input}
          value={entrada}
          onChangeText={setEntrada}
          placeholder="¿Qué producto buscas?"
          placeholderTextColor={COLORS.textMuted}
          onSubmitEditing={() => enviar()}
          returnKeyType="send"
        />
        <TouchableOpacity
          onPress={() => enviar()}
          disabled={!entrada.trim()}
          style={[s.sendBtn, !entrada.trim() && { opacity: 0.4 }]}
        >
          <Text style={{ fontSize: 16 }}>📤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORS.bg },
  header:          { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14, backgroundColor: COLORS.bgCard, borderBottomWidth: 1, borderBottomColor: COLORS.borderMuted },
  botAvatar:       { width: 40, height: 40, borderRadius: 12, backgroundColor: '#0F1E35', borderWidth: 1, borderColor: COLORS.borderMuted, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  onlineDot:       { position: 'absolute', bottom: -2, right: -2, width: 10, height: 10, borderRadius: 5, backgroundColor: '#34D399', borderWidth: 2, borderColor: COLORS.bg },
  botNombre:       { color: COLORS.text, fontSize: 13, fontWeight: '700' },
  botStatus:       { color: '#34D399', fontSize: 11 },
  mensajesWrap:    { flex: 1 },
  mensajesContent: { padding: 16, gap: 12 },
  msgRow:          { flexDirection: 'row', gap: 8, alignItems: 'flex-end' },
  msgRowUser:      { justifyContent: 'flex-end' },
  msgAvatar:       { width: 28, height: 28, borderRadius: 8, backgroundColor: '#0F1E35', borderWidth: 1, borderColor: COLORS.borderMuted, alignItems: 'center', justifyContent: 'center' },
  bubble:          { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 },
  bubbleBot:       { backgroundColor: COLORS.bgCard, borderWidth: 1, borderColor: COLORS.borderMuted, borderBottomLeftRadius: 4 },
  bubbleUser:      { backgroundColor: COLORS.primary, borderBottomRightRadius: 4 },
  bubbleText:      { color: COLORS.text, fontSize: 13, lineHeight: 19 },
  hora:            { color: COLORS.textMuted2, fontSize: 9, marginTop: 4, paddingHorizontal: 4 },
  productosWrap:   { marginLeft: 36, marginTop: 8, gap: 8 },
  sugerenciasWrap: { maxHeight: 46, backgroundColor: COLORS.bg },
  sugerencia:      { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, backgroundColor: 'rgba(0,191,255,0.06)' },
  sugerenciaText:  { color: COLORS.primary, fontSize: 11 },
  inputArea:       { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingVertical: 10, borderTopWidth: 1, borderTopColor: COLORS.borderMuted, backgroundColor: COLORS.bg },
  input:           { flex: 1, backgroundColor: '#0F1E35', borderRadius: 18, borderWidth: 1, borderColor: COLORS.borderMuted, paddingHorizontal: 16, paddingVertical: 11, color: COLORS.text, fontSize: 14 },
  sendBtn:         { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.5, shadowRadius: 8, elevation: 4 },
});
