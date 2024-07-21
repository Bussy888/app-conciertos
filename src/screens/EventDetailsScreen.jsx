import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const EventDetailsScreen = ({ route, navigation }) => {
    const { title, month, day, imageUri, description } = route.params;

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: imageUri }} style={styles.image}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' size={25} color="#ffffff"/>
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>{month} {day}</Text>
                
                <View style={styles.tabContainer}>
                    <Text style={[styles.tab, styles.activeTab]}>ABOUT</Text>
                    <Text style={styles.tab}>PARTICIPANTS</Text>
                    <Text style={styles.tab}>LOCATION</Text>
                </View>
                <Text style={styles.description}>{description}</Text>
                <TouchableOpacity>
                <LinearGradient
                    colors={['#6ED0E0', '#E04989']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Buy tickets for $79</Text>
                </LinearGradient>
                    
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save for later</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    image: {
        width: '100%',
        height: 300,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    backButton: {
        margin: 16, padding: 8, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 8,
        marginTop:35
    },
    backButtonText: {
        color: '#fff',
        fontSize: 24
    },
    detailsContainer: {
        padding: 16
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8
    },
    date: {
        color: '#aaa',
        fontSize: 16,
        marginBottom: 16
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16
    },
    tab: {
        color: '#aaa',
        fontSize: 16,
        marginRight: 16
    },
    activeTab: {
        color: '#fff',
        fontWeight: 'bold'
    },
    description: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 16
    },
    button: {
        backgroundColor: '#e91e63',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    saveButton: {
        backgroundColor: '#333',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center'
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16
    },
});

export default EventDetailsScreen;
