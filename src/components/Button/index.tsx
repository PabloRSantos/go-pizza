import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import * as S from "./styles";

type Props = RectButtonProps & {
  title: string;
  type?: S.TypeProps;
  isLoading?: boolean;
};

export const Button: React.FC<Props> = ({
  title,
  type = "primary",
  isLoading = false,
  ...rest
}) => {
  return (
    <S.Container type={type} enabled={!isLoading} {...rest}>
      {isLoading ? <S.Load /> : <S.Title>{title}</S.Title>}
    </S.Container>
  );
};

