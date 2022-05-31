import React from 'react';
import { TextInputProps } from 'react-native';
import * as S from './styles';

type Props = TextInputProps & {
  type?: S.TypeProps
}

export const Input: React.FC<Props> = ({ type = 'primary', ...rest }) => {
  return (
    <S.Container type={type} {...rest} />
  );
};

