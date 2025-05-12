import { memo } from "react";
import { Button, Text, View } from "tamagui";

interface CalculatorButtonProps {
  label?: string | number;
  onPress: () => void;
  height: number;
  fontSize: number;
  isInverse?: boolean;
  icon?: React.ReactNode;
}

const CalculatorButton = ({
  label,
  onPress,
  height,
  fontSize,
  isInverse = false,
  icon,
}: CalculatorButtonProps) => {
  return (
    <Button
      flex={1}
      height={height}
      onPress={onPress}
      {...(isInverse && { themeInverse: true })}
    >
      {icon && <View>{icon}</View>}
      {label && (
        <Text color="$color" fontSize={fontSize}>
          {label}
        </Text>
      )}
    </Button>
  );
};

export default memo(CalculatorButton);
