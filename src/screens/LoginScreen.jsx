import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../config/firebase";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("mateo1@gmail.com");
    const [password, setPassword] = useState("pass123");
    const [loading, setLoading] = useState(false);

    const login = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoading(false);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setLoading(false);
            });
    };


    const goToSignup = () => {
        // Navegar a la pantalla de registro
        navigation.navigate('signup');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicio de Sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Correo Electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />
            </View>
            <TouchableOpacity onPress={login}>
                <LinearGradient
                    colors={['#6ED0E0', '#E04989']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.loginButton}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToSignup}
                loading={loading}
                loadingProps={{ size: "small", color: "white" }}>
                <Text style={styles.signupText}>No tienes una cuenta? Crea una cuenta</Text>
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
    loginButton: {
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
    signupText: {
        color: '#FFF',
        marginTop: 20,
    },
});

export default LoginScreen;
