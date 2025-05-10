import { memo } from "react";
import { TouchableOpacity } from "react-native";
import { Input } from "tamagui";

interface DisplayProps {
  value: string;
  height: number;
  fontSize: number;
  onPress: () => void;
}

const Display = ({ value, height, fontSize, onPress }: DisplayProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{ width: "100%" }}
    >
      <Input
        size="$4"
        width={"100%"}
        height={height}
        readOnly
        value={value}
        fontSize={fontSize}
      />
    </TouchableOpacity>
  );
};

export default memo(Display);
