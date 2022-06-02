import React from 'react';
import { TextInputProps } from 'react-native';
import * as S from './styles';

type Props = TextInputProps & {
  size: string
}

export const InputPrice: React.FC<Props> = ({ size, ...rest }) => {
  return (
    <S.Container>
      <S.Size>
        <S.Label>{size}</S.Label>
      </S.Size>

      <S.Label>R$</S.Label>
      <S.Input {...rest} keyboardType='numeric'  />
    </S.Container>
  );
};

