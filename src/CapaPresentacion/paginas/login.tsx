import { useState } from "react";
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";



// Asegúrate de cambiar la ruta para importar correctamente el contexto de autenticación (Capa de Negocio)
// import { useAutenticacion } from "../../CapaNegocio/contextos/contexto-autenticacion";
// Importamos los iconos nativos (en la web usabas ByteIcon, aquí usamos FontAwesome5 u otro similar)

export default function PaginaLogin({ navigation }: any) {
//   const { iniciarSesion, registrarse } = useAutenticacion();
  
  const [email, establecerEmail] = useState("");
  const [password, establecerPassword] = useState("");
  const [esRegistro, establecerEsRegistro] = useState(false);
  const [cargando, establecerCargando] = useState(false);
  const [error, establecerError] = useState("");

  const manejarSubmit = async () => {
    if (!email || !password) {
      establecerError("Por favor, llena todos los campos.");
      return;
    }
    
    establecerError("");
    establecerCargando(true);

    try {
      if (esRegistro) {
        // await registrarse(email, password);
        establecerError("Registro exitoso. Revisa tu email para confirmar tu cuenta.");
      } else {
        // await iniciarSesion(email, password);
        // Ajusta la navegación al nombre de tu pantalla de chat en Expo Router o React Navigation
        navigation.navigate("Chat"); 
      }
    } catch (err) {
      const error = err as Error;
      establecerError(error.message || "Error en la autenticación");
    } finally {
      establecerCargando(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.contenedorPrincipal}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Tarjeta de Autenticación (Card) */}
        <View style={styles.tarjeta}>
          
          {/* Encabezado con Icono de Huella/Patita */}
          <View style={styles.encabezado}>
            <View style={styles.iconoContenedor}>
              <Image source={require('@/assets/images/robotcito.png')} style={styles.logo} />
            </View>
            
            <Text style={styles.titulo}>
              {esRegistro ? "Crear cuenta" : "Iniciar sesión"}
            </Text>
            
            <Text style={styles.descripcion}>
              {esRegistro 
                ? "Crea una cuenta para guardar tus conversaciones" 
                : "Ingresa a tu cuenta para continuar"}
            </Text>
          </View>

          {/* Formulario */}
          <View style={styles.formulario}>
            
            {/* Input Email */}
            <View style={styles.inputGrupo}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="tu@email.com"
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={establecerEmail}
              />
            </View>

            {/* Input Contraseña */}
            <View style={styles.inputGrupo}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={true}
                autoCapitalize="none"
                value={password}
                onChangeText={establecerPassword}
              />
            </View>

            {/* Manejo de Errores o Éxito */}
            {error ? (
              <Text style={[styles.textoError, error.includes("exitoso") && styles.textoExito]}>
                {error}
              </Text>
            ) : null}

            {/* Botón Principal de Envío */}
            <TouchableOpacity 
              style={[styles.botonPrincipal, cargando && styles.botonDeshabilitado]} 
              onPress={manejarSubmit}
              disabled={cargando}
              activeOpacity={0.8}
            >
              {cargando ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.botonPrincipalTexto}>
                  {esRegistro ? "Registrarse" : "Iniciar sesión"}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Acciones del Footer de la Tarjeta */}
          <View style={styles.tarjetaFooter}>
            
            {/* Alternar entre Registro y Login */}
            <TouchableOpacity 
              onPress={() => {
                establecerEsRegistro(!esRegistro);
                establecerError("");
              }}
              style={styles.linkBoton}
            >
              <Text style={styles.linkTexto}>
                {esRegistro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
              </Text>
            </TouchableOpacity>

            {/* Continuar sin cuenta */}
            <TouchableOpacity 
              onPress={() => navigation.navigate("Chat")} 
              style={[styles.linkBoton, { marginTop: 16 }]}
            >
              <Text style={styles.linkTextoSecundario}>Continuar sin cuenta</Text>
            </TouchableOpacity>

          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({


  contenedorPrincipal: {
    flex: 1,
    backgroundColor: "#e1decf", // Fondo beige claro de tus capturas
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  tarjeta: {
    backgroundColor: "#3f90ce", // Fondo de la tarjeta ligeramente más claro
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#968448",    // Borde sutil armónico
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,               // Sombra suave para Android
  },
  encabezado: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconoContenedor: {
    marginBottom: 12,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2C1B10",           // Café oscuro para tipografía principal
    marginBottom: 6,
    textAlign: "center",
  },
  descripcion: {
    fontSize: 14,
    color: "#000000",           // Tono marrón suave descriptivo
    textAlign: "center",
    lineHeight: 20,
  },
  formulario: {
    width: "100%",
  },
  inputGrupo: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",           // Color del Label
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFDF9",
    borderWidth: 1,
    borderColor: "#DCD0B4",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#2C1B10",
  },
  textoError: {
    color: "#D32F2F",
    fontSize: 13,
    marginBottom: 12,
    textAlign: "center",
  },
  textoExito: {
    color: "#2E7D32",
  },
  botonPrincipal: {
    backgroundColor: "#2d66b7", // El color café marrón idéntico de tus botones
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
  botonPrincipalTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  tarjetaFooter: {
    marginTop: 20,
    alignItems: "center",
  },
  linkBoton: {
    paddingVertical: 4,
  },
  linkTexto: {
    fontSize: 14,
    color: "#000000",           // Texto interactivo color de la marca
    fontWeight: "500",
  },
  linkTextoSecundario: {
    fontSize: 14,
    color: "#5C4A39",           // Variante para "Continuar sin cuenta"
    fontWeight: "500",
  },


  logo: {
  width: 80,                  // Ancho de la imagen
  height: 80,                 // Alto de la imagen (debe ser idéntico al ancho)
  borderRadius: 40,           // La mitad exacta para formar un círculo perfecto
  backgroundColor: '#FFFFFF', // Asegura un fondo blanco limpio bajo el robot
  overflow: 'hidden',         // ¡MÁGICO! Recorta el fondo blanco cuadrado de la imagen original
  resizeMode: 'contain',      // Mantiene al robot centrado y sin deformarse
  alignSelf: 'center',        // Centra el logo en su contenedor

}
});