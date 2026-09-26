import React from 'react';
import {Modal, Pressable, StyleSheet} from "react-native";

export default function BaseModal({children, onClose, visible}) {


    return(
        <Modal transparent={true} animationType={"fade"} visible={visible} onRequestClose={onClose} statusBarTranslucent={true} navigationBarTranslucent={true}>
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable style={styles.modal} onPress={(event) => event.stopPropagation()}>
                    {children}
                </Pressable>
            </Pressable>

        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
      backgroundColor: "rgba(0,0,0,0.50)",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modal: {
        width: '95%',
        maxWidth: 620,
        maxHeight: '85%',
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: "hidden",
    },
})
