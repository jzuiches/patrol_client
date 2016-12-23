import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { globals, formStyles } from '../styles';
const styles = formStyles;
const TrainingCodeList = ({ training_codes, handlePress }) => {
  return(
    <View style={styles.codeContainer}>
    {training_codes.map((training_code, idx) => {
      return (
        < TouchableOpacity
        key={idx}
        onPress={() => handlePress(idx)}
        style={styles.technology}
        >
        <Text style={[styles.h6, globals.primaryText]}>
          {training_code}
          </Text>
        </TouchableOpacity>
      );
    })}
    </View>
);
};
export default TrainingCodeList;
