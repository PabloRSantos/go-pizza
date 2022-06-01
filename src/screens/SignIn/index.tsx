import { Input, Button } from "@/components";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import * as S from "./styles";
import brandImg from "@/assets/brand.png";
import { useAuth } from "@/hooks/auth";

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLogging } = useAuth();

  function handleSignIn() {
    signIn(email, password);
  }

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
            onChangeText={setEmail}
          />

          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            onChangeText={setPassword}
          />

          <S.ForgotPasswordButton>
            <S.ForgotPasswordLabel>Esqueci minha senha</S.ForgotPasswordLabel>
          </S.ForgotPasswordButton>

          <Button title="Entrar" isLoading={isLogging} onPress={handleSignIn} />
        </S.Content>
      </KeyboardAvoidingView>
    </S.Container>
  );
};
