
import React, { useRef, useState } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';

const TestScreen = () => {
    const Data = [
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
        { id: Math.random(), name: "Here" },
    ]



    const scrollViewRef = useRef();
    const [lastVisibleIndex, setLastVisibleIndex] = useState(-1);
    const [alertShown, setAlertShown] = useState(false);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

        if (isAtBottom && !alertShown) {
            // Calculate the index of the last visible tile
            const visibleIndexes = Math.floor(contentOffset.y / 105); // Assuming each tile is 100 height with 5 margin
            setLastVisibleIndex(visibleIndexes);

            // Print the index of the last visible tile
            console.log('Last Visible Tile Index:', visibleIndexes);

            // Trigger the alert only once
            setAlertShown(true);

            // You can customize the alert message or replace it with your desired action
            console.log("You reached the last tile at index ${visibleIndexes}!")
            // Alert.alert('Alert', `You reached the last tile at index ${visibleIndexes}!`);
        } else if (!isAtBottom) {
            // Reset the alert flag if the user scrolls up
            setAlertShown(false);
        }
    };

    return (
        <View style={{ height: '100%', width: '100%', backgroundColor: 'blue' }}>
            <ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16} // Adjust this value based on your performance needs
            >
                {Data.map((i) => (
                    <View
                        key={i.id}
                        style={{
                            height: 100,
                            width: '100%',
                            backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 5,
                        }}
                    >
                        <Text>{i.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );

}

export default TestScreen