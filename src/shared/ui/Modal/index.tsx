import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Modal} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';

interface IModal {
  modalTitle?: string | null;
  hideModal: () => void;
  visible: boolean;
  children: React.ReactNode;
}

const RNModal = ({
  modalTitle = null,
  hideModal,
  visible,
  children,
}: IModal): JSX.Element => {
  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={styles.modal}>
      <View style={styles.modalHeader}>
        {modalTitle && <Text style={styles.modalTitle}>{modalTitle}</Text>}
        <Ionicon
          name="md-close-outline"
          style={styles.closeIcon}
          size={30}
          onPress={hideModal}
        />
      </View>
      {children}
    </Modal>
  );
};

export default memo(RNModal);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginHorizontal: 30,
    borderRadius: 10,
    zIndex: 2,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
  },
  closeIcon: {
    marginTop: -5,
  },
});
