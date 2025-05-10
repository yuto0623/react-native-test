import { useCalculator } from "@/hooks/useCalculator";
import { memo } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { Input } from "tamagui";

const Display = () => {
  const { height } = useWindowDimensions();
  const { copyToClipboard, value } = useCalculator();

  const buttonHeight = Math.floor(height * 0.1);
  const inputFontSize = Math.floor(height * 0.04); // 画面高さの4%

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={copyToClipboard}
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
  );
};

export default memo(Display);
