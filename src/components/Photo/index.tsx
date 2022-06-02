import React from 'react';
import * as S from './styles';

type Props = {
  uri: string | null
}

export const Photo: React.FC<Props> = ({ uri }) => {
  if(uri) {
    return <S.Image source={{ uri }}/>
  }

  return (
      <S.Placeholder>
        <S.PlaceholderTitle>
          Nenhuma foto{'\n'}carregada
        </S.PlaceholderTitle>
      </S.Placeholder>
  );
};
