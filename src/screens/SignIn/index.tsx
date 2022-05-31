import { Input, Button } from "@/components";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import * as S from "./styles";
import brandImg from '@/assets/brand.png'

export const SignIn: React.FC = () => {
  return (
    <S.Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <S.Content>
          <S.Brand source={brandImg} />
          <S.Title>Login</S.Title>
          <Input
            autoCapitalize="none"
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
          />

          <Input placeholder="Senha" type="secondary" secureTextEntry />

          <S.ForgotPasswordButton>
            <S.ForgotPasswordLabel>
                Esqueci minha senha
            </S.ForgotPasswordLabel>
          </S.ForgotPasswordButton>

          <Button title="Entrar" />
        </S.Content>
      </KeyboardAvoidingView>
    </S.Container>
  );
};
