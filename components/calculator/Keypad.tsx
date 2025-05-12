import { memo } from "react";
import { default as FontAwesome6 } from "react-native-vector-icons/FontAwesome6";
import { default as MaterialCommunityIcons } from "react-native-vector-icons/MaterialCommunityIcons";
import { View, XStack } from "tamagui";
import CalculatorButton from "./CalculatorButton";

interface KeypadProps {
  onChangeValue: (value: string | number) => void;
  onClear: () => void;
  onClearOne: () => void;
  onToggleSign: () => void;
  onCalculate: () => void;
  buttonHeight: number;
  buttonFontSize: number;
}

const Keypad = ({
  onChangeValue,
  onClear,
  onClearOne,
  onToggleSign,
  onCalculate,
  buttonHeight,
  buttonFontSize,
}: KeypadProps) => {
  return (
    <View width="100%">
      {/* 上部ボタン行 (AC, +/-, %, ÷) */}
      <XStack gap="$2" marginBottom="$2">
        <CalculatorButton
          label="AC"
          onPress={onClear}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
        <CalculatorButton
          icon={
            <MaterialCommunityIcons
              name="plus-minus-variant"
              size={buttonFontSize}
              color="$color"
            />
          }
          onPress={onToggleSign}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
        <CalculatorButton
          label="%"
          onPress={() => onChangeValue("%")}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
        <CalculatorButton
          label="÷"
          onPress={() => onChangeValue("÷")}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
      </XStack>
      {/* 数字キー (7-9, 4-6, 1-3) */}
      {[
        [7, 8, 9, "×"],
        [4, 5, 6, "-"],
        [1, 2, 3, "+"],
      ].map((row, rowIndex) => (
        <XStack key={rowIndex} gap="$2" marginBottom="$2">
          {row.map((item) => (
            <CalculatorButton
              key={item}
              label={item}
              onPress={() => onChangeValue(item.toString())}
              height={buttonHeight}
              fontSize={buttonFontSize}
            />
          ))}
        </XStack>
      ))}{" "}
      {/* 下部ボタン行 (0, ., ⌫, =) */}
      <XStack gap="$2">
        <CalculatorButton
          label="0"
          onPress={() => onChangeValue(0)}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
        <CalculatorButton
          label="."
          onPress={() => onChangeValue(".")}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
        <CalculatorButton
          icon={
            <FontAwesome6
              name="delete-left"
              size={buttonFontSize}
              color="$color"
            />
          }
          onPress={onClearOne}
          height={buttonHeight}
          fontSize={buttonFontSize}
        />
        <CalculatorButton
          label="="
          onPress={onCalculate}
          height={buttonHeight}
          fontSize={buttonFontSize}
          isInverse={true}
        />
      </XStack>
    </View>
  );
};

export default memo(Keypad);
