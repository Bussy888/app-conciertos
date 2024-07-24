import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase'; // Asegúrate de importar tu configuración de Firebase

// Importa la imagen de fondo desde una URL
const backgroundImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZW0lIGtatjKvieuNitPdfQE0ukLHQQbPHxA&s';

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateAccount = async () => {
        try {
            // Crear usuario en Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Almacenar detalles del usuario en Firestore
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name,
                surname,
                username,
                email,
            });

            Alert.alert('Éxito', 'Cuenta creada con éxito');
            navigation.navigate('login'); // Navegar a la pantalla de inicio de sesión
        } catch (error) {
            console.error('Error al crear la cuenta:', error);
            Alert.alert('Error', error.message);
        }
    };

    const goToLogin = () => {
        navigation.navigate('login');
    };

    return (
        <View style={styles.container}>
            {/* Fondo de imagen con superposición semi-transparente */}
            <ImageBackground 
                source={{ uri: backgroundImage }} // URL de la imagen de fondo
                style={styles.backgroundImage}
            >
                <View style={styles.overlay}>
                    {/* Contenido dentro del contenedor oscuro */}
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Crear Cuenta</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre"
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Apellido"
                                value={surname}
                                onChangeText={setSurname}
                                autoCapitalize="words"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
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
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // o 'stretch'
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)', // Fondo oscurecido semi-transparente
    },
    contentContainer: {
        flex: 1,
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
