import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SignupScreen = ({ navigation }) => {
    const handleCreateAccount = () => {
        // Aquí puedes implementar la lógica para crear la cuenta
        console.log('Crear Cuenta');
    };

    const goToLogin = () => {
        // Navegar a la pantalla de inicio de sesión
        navigation.navigate('login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Cuenta</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Apellido"
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo Electrónico"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    autoCapitalize="none"
                />
            </View>
            <TouchableOpacity onPress={handleCreateAccount}>
                <LinearGradient
                    colors={['#6ED0E0', '#E04989']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.signupButton}>
                    <Text style={styles.buttonText}>Crear Cuenta</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToLogin}>
                <Text style={styles.loginText}>Ya tienes una cuenta? Iniciar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 34,
        color: '#FFF',
        marginBottom: 30,
        fontWeight: "800"
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 16,
    },
    signupButton: {
        width: '100%',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 50,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    loginText: {
        color: '#FFF',
        marginTop: 20,
    },
});

export default SignupScreen;
