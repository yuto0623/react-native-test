import { useCalculator } from "@/hooks/useCalculator";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { default as FontAwesome6 } from "react-native-vector-icons/FontAwesome6";
import { default as MaterialCommunityIcons } from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Input, Text, View, XStack, YStack } from "tamagui";

export default function CalculatorScreen() {
  const { height } = useWindowDimensions();

  const buttonHeight = Math.floor(height * 0.1);
  const inputFontSize = Math.floor(height * 0.04); // 画面高さの4%
  const buttonFontSize = Math.floor(height * 0.023); // 画面高さの2.3%

  const {
    handleChange,
    handleCalculate,
    handleClear,
    handleClearOne,
    handleToggleSign,
    copyToClipboard,
    value,
  } = useCalculator();

  return (
    <YStack
      height={"100%"}
      paddingVertical={"$8"}
      paddingHorizontal="$4"
      justifyContent="flex-end"
      alignItems="center"
      gap="$4"
      backgroundColor="$background"
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => copyToClipboard()}
        style={{ width: "100%" }}
      >
        <Input
          size="$4"
          width={"100%"}
          height={buttonHeight * 1.8}
          readOnly
          value={value}
          fontSize={inputFontSize}
        />
      </TouchableOpacity>
      <View width="100%">
        <XStack gap="$2" marginBottom="$2">
          <Button flex={1} height={buttonHeight} onPress={() => handleClear()}>
            <Text color="$color" fontSize={buttonFontSize}>
              AC
            </Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleToggleSign()}
          >
            <Text color="$color" fontSize={buttonFontSize}>
              <MaterialCommunityIcons
                name="plus-minus-variant"
                size={buttonFontSize}
              />
            </Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange("%")}
          >
            <Text color="$color" fontSize={buttonFontSize}>
              %
            </Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange("÷")}
          >
            <Text color="$color" fontSize={buttonFontSize}>
              ÷
            </Text>
          </Button>
        </XStack>
        {[
          [7, 8, 9, "×"],
          [4, 5, 6, "-"],
          [1, 2, 3, "+"],
        ].map((row, rowIndex) => (
          <XStack key={rowIndex} gap="$2" marginBottom="$2">
            {row.map((i) => (
              <Button
                key={i}
                flex={1}
                height={buttonHeight}
                onPress={() => handleChange(i.toString())}
              >
                <Text color="$color" fontSize={buttonFontSize}>
                  {i}
                </Text>
              </Button>
            ))}
          </XStack>
        ))}
        <XStack gap="$2">
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange(0)}
          >
            <Text color="$color" fontSize={buttonFontSize}>
              0
            </Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleChange(".")}
          >
            <Text color="$color" fontSize={buttonFontSize}>
              .
            </Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleClearOne()}
          >
            <Text color="$color">
              <FontAwesome6 name="delete-left" size={buttonFontSize} />
            </Text>
          </Button>
          <Button
            flex={1}
            height={buttonHeight}
            onPress={() => handleCalculate()}
            themeInverse
          >
            <Text color="$color" fontSize={buttonFontSize}>
              =
            </Text>
          </Button>
        </XStack>
      </View>
    </YStack>
  );
}
