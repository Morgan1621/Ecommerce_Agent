import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';


export default function Home() {
  const { width } = useWindowDimensions();
  const esComputadora = width > 768; // Diseño responsivo tipo PC si pasa de 768px

  return (
    <View style={styles.container}>
      {/* se cambio el estado de la barra superior a "light" para que los iconos del cel se vean blancos */}
      <StatusBar style="light" />

      {/* 1. NAVBAR / HEADER */}
      <View style={[styles.navbar, { paddingHorizontal: esComputadora ? 80 : 20 }]}>

        <View style={styles.logoContainer}>|
          <MaterialCommunityIcons name="robot-outline" size={26} color="#00A3E0" />
          <Text style={styles.logo}>EcommerAgent</Text>
        </View>

              {/* {esComputadora && (
                <View style={styles.navLinks}>
                  <Text style={styles.navLinkActive}>Producto</Text>
                  <Text style={styles.navLink}>Características</Text>
                  <Text style={styles.navLink}>Precios</Text>
                </View>
              )} */}

              
        {/* Lado Derecho: Contenedor para juntar los dos botones en horizontal */}
        <View style={styles.botonesDerechaContenedor}>

              {/* 2. Botón GitHub  */}
              <TouchableOpacity 
                style={styles.githubButton}
                onPress={() => Linking.openURL('https://github.com/Morgan1621/Ecommerce_Agent')}
                accessibilityLabel="Repositorio de GitHub"
              >
                <FontAwesome name="github" size={24} color="#00B5E2" />
              </TouchableOpacity>


               {/* 1. Botón Empezar */}
              <TouchableOpacity style={styles.getStartedBtn}>
                <Text style={styles.getStartedBtnText}>Iniciar Sesion</Text>
              </TouchableOpacity>

          </View> 
            
        </View>
        
      
        <ScrollView showsVerticalScrollIndicator={false}>

        {/* 2. HERO SECTION (Texto + Simulación del Chatbot) */}
        <View style={[
          styles.heroSection,
          { 
            flexDirection: esComputadora ? 'row' : 'column',
            paddingHorizontal: esComputadora ? 80 : 24,
            paddingTop: esComputadora ? 60 : 30
          }
        ]}>
          {/* Bloque Izquierdo: Mensaje */}
          <View style={[styles.heroLeft, { width: esComputadora ? '50%' : '100%', paddingRight: esComputadora ? 40 : 0 }]}>
            <View style={styles.badge}><Text style={styles.badgeText}>Nex-Bot</Text></View>
            <Text style={[styles.heroTitle, { fontSize: esComputadora ? 44 : 30, lineHeight: esComputadora ? 54 : 38 }]}>
              Impulsas tu negocio con <Text style={{ color: '#00B5E2' }}>NexBot</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Automatiza tu servicio al cliente, optimiza procesos de venta y escala tu negocio sin límites. El futuro del comercio electrónico está aquí.
            </Text>
            <View style={styles.heroButtons}>
              <TouchableOpacity style={styles.primaryBtn}><Text style={styles.primaryBtnText}>Chatea Gratis</Text></TouchableOpacity>
              {/* <TouchableOpacity style={styles.secondaryBtn}><Text style={styles.secondaryBtnText}>Ver Demo</Text></TouchableOpacity> */}
            </View>
          </View>

          {/* Bloque Derecho: UI Interactiva del Chatbot */}
          <View style={[styles.heroRight, { width: esComputadora ? '50%' : '100%', marginTop: esComputadora ? 0 : 40 }]}>
            <View style={styles.chatMockup}>
              <View style={styles.chatHeader}>
                <MaterialCommunityIcons name="robot" size={20} color="#FFF" style={styles.chatHeaderIcon} />
                <View>
                  <Text style={styles.chatHeaderTitle}>NexBot</Text>
                  <Text style={styles.chatHeaderStatus}>● Online & Procesando</Text>
                </View>
              </View>
              <View style={styles.chatBody}>
                <View style={styles.msgBotClient}><Text style={styles.msgBotText}>¡Hola soy NexBot! ¿En qué puedo ayudarte hoy?</Text></View>
                <View style={styles.msgUserClient}><Text style={styles.msgUserText}>¿Busco una laptop gamer de marca HP?</Text></View>
                <View style={styles.msgBotClient}><Text style={styles.msgBotText}>¡Excelente eleccion! Aqui tienes algunas de nuestras mejores opciones:</Text></View>
              </View>
              <View style={styles.chatInputMock}>
                <Text style={{ color: '#64748B', fontSize: 13 }}>Escribe tu mensaje...</Text>
                <MaterialCommunityIcons name="send" size={18} color="#00A3E0" />
              </View>
            </View>
          </View>
        </View>

        {/* 3. MARCAS / INTEGRACIÓN PERFECTA */}
        <View style={styles.brandSection}>
          {/* <Text style={styles.brandTitle}>INTEGRACIÓN PERFECTA CON</Text> */}
          {/* <View style={styles.brandIconsRow}>
            <FontAwesome5 name="shopify" size={28} color="#96BF48" />
            <MaterialCommunityIcons name="wordpress" size={28} color="#21759B" />
            <MaterialCommunityIcons name="cart-variant" size={28} color="#94A3B8" />
            <MaterialCommunityIcons name="laptop" size={28} color="#94A3B8" />
          </View> */}
        </View>

        {/* 4. POTENCIA TU E-COMMERCE (Características de 3 Columnas) */}
        <View style={[styles.featuresSection, { paddingHorizontal: esComputadora ? 80 : 24 }]}>
          <Text style={styles.featuresHeading}>Potencia tu NexBot</Text>
          <Text style={styles.featuresSubheading}>Nuestro Agente no solo responde preguntas, está diseñado para vender. Descubre cómo transformar las conversaciones de tu tienda electrónica en ingresos constantes.</Text>
          
          <View style={[styles.featuresGrid, { flexDirection: esComputadora ? 'row' : 'column', gap: 20 }]}>
            {/* Card 1 */}
            <View style={[styles.featCard, { flex: esComputadora ? 1 : 0 }]}>
              <View style={styles.featIconBox}><MaterialCommunityIcons name="auto-fix" size={22} color="#00A3E0" /></View>
              <Text style={styles.featCardTitle}>Guía de Compra Interactiva</Text>
              <Text style={styles.featCardDesc}>Tu chatbot no solo responde dudas sobre envíos o stock al instante; actúa como un asesor experto que sugiere productos, resuelve objeciones y guía a tus clientes directo a la pasarela de pago usando lenguaje natural.</Text>
            </View>
            {/* Card 2 - Destacado en Azul Oscuro */}
            <View style={[styles.featCard, styles.featCardActive, { flex: esComputadora ? 1 : 0 }]}>
              <View style={[styles.featIconBox, { backgroundColor: 'rgba(255,255,255,0.15)' }]}><MaterialCommunityIcons name="face-agent" size={22} color="#FFF" /></View>
              <Text style={[styles.featCardTitle, { color: '#FFF' }]}>Ventas e Interacción 24/7</Text>
              <Text style={[styles.featCardDesc, { color: '#E0F2FE' }]}>Tu tienda nunca duerme. NexBot atiende a clientes en cualquier zona horaria, asegurando que ninguna venta se pierda.</Text>
            </View>
            {/* Card 3 */}
            <View style={[styles.featCard, { flex: esComputadora ? 1 : 0 }]}>
              <View style={styles.featIconBox}><MaterialCommunityIcons name="hubspot" size={22} color="#00A3E0" /></View>
              <Text style={styles.featCardTitle}>Historial de Usuario</Text>
              <Text style={styles.featCardDesc}>Cero repeticiones, mejor servicio. El chatbot almacena la conversacion de cada cliente, sus compras anteriores y sus preferencias de conversación.</Text>
            </View>
          </View>
        </View>

          
          {/* 5. ¿CÓMO FUNCIONA? (Pasos 1, 2, 3) */}
        {/* Renderizamos únicamente la línea de diseño*/}
        <View style={styles.lineaUnicaDivisoria} />

        {/* 6. CALL TO ACTION - CAJA OSCURA (Borde sutil para resaltar sobre el fondo negro) */}
        <View style={[styles.ctaSection, { marginHorizontal: esComputadora ? 80 : 20 }]}>
          <Text style={[styles.ctaTitle, { fontSize: esComputadora ? 34 : 24 }]}>¿Listo para comenzar?</Text>
          <Text style={styles.ctaSubtitle}>Únete a más de 500 tiendas que ya confian con NexBot para su tienda. Sin tarjetas de crédito, sin complicaciones.</Text>
          <View style={[styles.ctaButtons, { flexDirection: esComputadora ? 'row' : 'column' }]}>
            <TouchableOpacity style={styles.ctaPrimaryBtn}><Text style={styles.ctaPrimaryBtnText}>Comenzar a Chat Ahora</Text></TouchableOpacity>
            {/* <TouchableOpacity style={styles.ctaSecondaryBtn}>
              <Text style={styles.ctaSecondaryBtnText}>Hablar con ventas →</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        {/* 7. FOOTER */}
        <View style={[styles.footer, { paddingHorizontal: esComputadora ? 80 : 20 }]}>
          <View style={[styles.footerTop, { flexDirection: esComputadora ? 'row' : 'column', justifyContent: 'space-between' }]}>
            <View style={{ marginBottom: 30, maxWidth: 300 }}>


              <View style={styles.footerBrandContainer}>
                <Image source={require('@/assets/images/transparante.jpeg')} style={styles.footerRobotIcon}/>
              </View>


              <Text style={styles.footerLogo}>Nex Bot</Text>
              <Text style={styles.footerDescription}>Soluciones de inteligencia artificial diseñadas para la nueva era del comercio digital.</Text>
            </View>
            <View style={[styles.footerLinksGrid, { gap: esComputadora ? 60 : 30 }]}>
              <View>
                <Text style={styles.footerLinkHeader}>Enlaces</Text>
                <Text style={styles.footerSubLink}>Quienres somos</Text>
                <Text style={styles.footerSubLink}>Politica Privacidad</Text>
                <Text style={styles.footerSubLink}>Contactenos</Text>
              </View>
              {/* <View>
                <Text style={styles.footerLinkHeader}>RESOURCES</Text>
                <Text style={styles.footerSubLink}>Documentation</Text>
                <Text style={styles.footerSubLink}>Blog</Text>
                <Text style={styles.footerSubLink}>Support</Text>
              </View> */}
            </View>
          </View>
          <View style={styles.footerBottom}>
            <Text style={styles.footerCopy}>© 2026 NexBot Agente. Todos los derechos reservados.</Text>
          </View>
        </View>

        </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({

footerBrandContainer: 
{
  flexDirection: 'row',  
  alignItems: 'center',
  gap: 12,               
  marginBottom: 12,      
},

footerRobotIcon: {
  width: 40,
  height: 40,
  resizeMode: 'contain',
  // Si estás en web/Expo, este comando intentará disimular el fondo blanco:
  // @ts-ignore
  mixBlendMode: 'screen', 
},

footerLogo: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#FFFFFF',
},


  lineaUnicaDivisoria: 
{
  height: 1,                   
  backgroundColor: '#348d8a',  
  opacity: 0.2,                
  marginVertical: 40,         
},

  githubButton: 
  {
    width: 44,
    height: 44,
    borderRadius: 22, // Esto lo hace perfectamente redondo
    borderWidth: 1,
    borderColor: '#348d8a',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  botonesDerechaContenedor: 
  {
  flexDirection: 'row',  // Los alinea en fila horizontal
  alignItems: 'center',  // Los centra verticalmente para que queden simétricos
  gap: 12,               // Agrega un espacio de 12px entre el botón Empezar y el de GitHub
},

  container: { flex: 1, backgroundColor: '#000000', paddingTop: 20 },
  
  // Navbar (Fondo negro, textos blancos)
  navbar: { height: 75, backgroundColor: '#000000', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: '#1E293B' },
  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logo: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  navLinks: { flexDirection: 'row', gap: 24 },
  navLink: { color: '#94A3B8', fontSize: 14, fontWeight: '500' },
  navLinkActive: { color: '#00A3E0', fontSize: 14, fontWeight: '600' },
  getStartedBtn: { backgroundColor: '#00B5E2', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6 },
  getStartedBtnText: { color: '#FFF', fontSize: 13, fontWeight: '600' },

  // Hero Section
  heroSection: { paddingVertical: 40, backgroundColor: '#000000' },
  heroLeft: { justifyContent: 'center' },
  badge: { backgroundColor: '#1E293B', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 4, alignSelf: 'flex-start', marginBottom: 16 },
  badgeText: { color: '#38BDF8', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  heroTitle: { fontWeight: '800', color: '#FFFFFF', marginBottom: 16 },
  heroSubtitle: { fontSize: 15, color: '#94A3B8', lineHeight: 24, marginBottom: 28 },
  heroButtons: { flexDirection: 'row', gap: 12 },
  primaryBtn: { backgroundColor: '#00B5E2', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 8 },
  primaryBtnText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
  secondaryBtn: { backgroundColor: '#111827', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 8, borderWidth: 1, borderColor: '#334155' },
  secondaryBtnText: { color: '#CBD5E1', fontWeight: '600', fontSize: 15 },
  
  // Chat Mockup (Diseño oscuro elegante para la ventana)
  heroRight: { alignItems: 'center', justifyContent: 'center' },
  chatMockup: { width: '100%', maxWidth: 440, backgroundColor: '#0F172A', borderRadius: 16, borderWidth: 1, borderColor: '#1E293B', overflow: 'hidden' },
  chatHeader: { backgroundColor: '#1E293B', padding: 16, flexDirection: 'row', alignItems: 'center', gap: 10 },
  chatHeaderIcon: { backgroundColor: '#00A3E0', padding: 6, borderRadius: 20 },
  chatHeaderTitle: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  chatHeaderStatus: { color: '#34D399', fontSize: 11, marginTop: 2 },
  chatBody: { padding: 16, backgroundColor: '#0F172A', gap: 12 },
  msgBotClient: { backgroundColor: '#1E293B', padding: 12, borderRadius: 12, borderTopLeftRadius: 0, maxWidth: '85%' },
  msgBotText: { color: '#E2E8F0', fontSize: 13, lineHeight: 18 },
  msgUserClient: { backgroundColor: '#00A3E0', padding: 12, borderRadius: 12, borderTopRightRadius: 0, maxWidth: '85%', alignSelf: 'flex-end' },
  msgUserText: { color: '#FFF', fontSize: 13, lineHeight: 18 },
  chatInputMock: { height: 50, backgroundColor: '#1E293B', borderTopWidth: 1, borderColor: '#334155', paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  // Brands
  brandSection: { paddingVertical: 30, alignItems: 'center', borderBottomWidth: 1, borderColor: '#1E293B' },
  brandTitle: { fontSize: 11, fontWeight: '700', color: '#64748B', letterSpacing: 1, marginBottom: 16 },
  brandIconsRow: { flexDirection: 'row', gap: 32, alignItems: 'center', opacity: 0.8 },

  // Features
  featuresSection: { paddingVertical: 60, backgroundColor: '#000000' },
  featuresHeading: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 12 },
  featuresSubheading: { fontSize: 15, color: '#94A3B8', textAlign: 'center', maxWidth: 600, alignSelf: 'center', marginBottom: 40, lineHeight: 22 },
  featuresGrid: { width: '100%' },
  featCard: { backgroundColor: '#0F172A', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#1E293B' },
  featCardActive: { backgroundColor: '#1E293B', borderColor: '#00A3E0' },
  featIconBox: { width: 44, height: 44, borderRadius: 8, backgroundColor: '#1E293B', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  featCardTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 },
  featCardDesc: { fontSize: 14, color: '#94A3B8', lineHeight: 21 },

  // Steps
  stepsSection: { paddingVertical: 60, backgroundColor: '#000000', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#1E293B' },
  stepsHeading: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', marginBottom: 8, textAlign: 'center' },
  stepsSubheading: { fontSize: 15, color: '#94A3B8', textAlign: 'center', marginBottom: 44 },
  stepsGrid: { justifyContent: 'space-between', width: '100%' },
  stepBox: { flex: 1, alignItems: 'center', textAlign: 'center', paddingHorizontal: 10 },
  stepCircle: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#00A3E0', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  stepNum: { fontSize: 16, fontWeight: '700', color: '#00A3E0' },
  stepTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 },
  stepDesc: { fontSize: 13, color: '#94A3B8', textAlign: 'center', lineHeight: 19 },

  // CTA (Caja gris muy oscuro para dar contraste)
  ctaSection: { backgroundColor: '#0F172A', borderRadius: 24, padding: 40, marginVertical: 60, alignItems: 'center', borderWidth: 1, borderColor: '#1E293B' },
  ctaTitle: { fontWeight: '800', color: '#FFF', marginBottom: 14, textAlign: 'center' },
  ctaSubtitle: { fontSize: 15, color: '#94A3B8', textAlign: 'center', maxWidth: 600, lineHeight: 22, marginBottom: 24 },
  ctaButtons: { gap: 14, width: '100%', justifyContent: 'center', alignItems: 'center' },
  ctaPrimaryBtn: { backgroundColor: '#00B5E2', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 8 },
  ctaPrimaryBtnText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
  ctaSecondaryBtn: { paddingVertical: 14, paddingHorizontal: 24 },
  ctaSecondaryBtnText: { color: '#FFF', fontWeight: '600', fontSize: 15 },

  // Footer
  footer: { backgroundColor: '#000000', paddingVertical: 50, borderTopWidth: 1, borderColor: '#1E293B' },
  footerTop: { width: '100%', borderBottomWidth: 1, borderColor: '#1E293B', paddingBottom: 30 },
  // footerLogo: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10 },
  footerDescription: { fontSize: 13, color: '#94A3B8', lineHeight: 20 },
  footerLinksGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  footerLinkHeader: { fontSize: 11, fontWeight: '700', color: '#64748B', letterSpacing: 1, marginBottom: 16 },
  footerSubLink: { fontSize: 13, color: '#94A3B8', marginBottom: 12 },
  footerBottom: { paddingTop: 20, alignItems: 'center' },
  footerCopy: { fontSize: 12, color: '#64748B' }


  
});


 

