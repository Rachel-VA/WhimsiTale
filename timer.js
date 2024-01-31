import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, BackHandler, Modal, Alert, Keyboard, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { audioAlertMapping } from './mappings'; // import the mapping mp3 files
import styles from './styles';

const Timer = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [remainingTime, setRemainingTime] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const soundObject = new Audio.Sound();

    const playSound = async (timeKey) => {
        try {
            await soundObject.unloadAsync(); // Unload any previous sound
            await soundObject.loadAsync(audioAlertMapping[timeKey]); // Load the new sound based on the timeKey
            await soundObject.playAsync(); // Play the sound
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    };

    useEffect(() => {
        let timer = null;
        if (remainingTime !== null) {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime > 0) {
                        // Check if the time matches any of the intervals and play the corresponding sound
                        if (prevTime === 15 * 60) playSound('15mins');
                        if (prevTime === 10 * 60) playSound('10mins');
                        if (prevTime === 5 * 60) playSound('5mins');

                        return prevTime - 1;
                    } else {
                        playSound('timeup'); // Play time's up sound
                        clearInterval(timer);
                        showAlert();
                        return 0;
                    }
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
            soundObject.unloadAsync(); // Unload sound when the component is unmounted
        };
    }, [remainingTime]);

    const showAlert = () => {
        Alert.alert(
            "Time's Up!",
            "Your timer has finished.",
            [
                {
                    text: "OK",
                    onPress: () => BackHandler.exitApp(),
                }
            ],
            { cancelable: false }
        );
    };

    const startTimer = () => {
        const totalMinutes = hours * 60 + minutes;
        setRemainingTime(totalMinutes * 60);
        Keyboard.dismiss();
        setModalVisible(false);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View>
            <TouchableOpacity 
                style={styles.customButton} 
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.customButtonText}>Set Timer</Text>
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.timerContainer}>
                    <Text style={styles.modalTitle}>Set Timer</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Hr</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Hours"
                            value={String(hours)}
                            onChangeText={(text) => setHours(parseInt(text) || 0)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Min</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Minutes"
                            value={String(minutes)}
                            onChangeText={(text) => setMinutes(parseInt(text) || 0)}
                            keyboardType="numeric"
                        />
                    </View>

                        <TouchableOpacity 
                            style={styles.startButton} 
                            onPress={startTimer}
                        >
                            <Text style={styles.startButtonText}>Start Timer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {remainingTime !== null && (
                <Text style={styles.remainingTimeText}>
                    Time Remaining: {formatTime(remainingTime)}
                </Text>
            )}
        </View>
    );
};

export default Timer;
