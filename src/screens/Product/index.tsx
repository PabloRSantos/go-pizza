import { Button, ButtonBack, Input, InputPrice, Photo } from "@/components";
import React, { useState } from "react";
import { Alert, Platform, ScrollView, TouchableOpacity } from "react-native";
import * as S from "./styles";
import * as ImagePicker from "expo-image-picker";
import fireStore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

export const Product: React.FC = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleAdd() {
    if (!name.trim())
      return Alert.alert("Cadastro", "Informe o nome da pizza.");
    if (!description.trim())
      return Alert.alert("Cadastro", "Informe a descrição da pizza.");
    if (!image) return Alert.alert("Cadastro", "Selecione a imagem da pizza.");
    if (!priceSizeP || !priceSizeM || !priceSizeG)
      return Alert.alert(
        "Cadastro",
        "Informe o preço de todos os tamanhos da pizza."
      );

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);
    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    fireStore()
      .collection("pizzas")
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        photo_path: reference.fullPath,
      })
      .then(() => Alert.alert("Cadastro", "Pizza cadastrada com sucesso."))
      .catch(() =>
        Alert.alert("Cadastro", "Não foi possivel cadastrar a pizza")
      );

    setIsLoading(false);
  }

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <S.Header>
          <ButtonBack />
          <S.Title>Cadastrar</S.Title>

          <TouchableOpacity>
            <S.DeleteLabel>Deletar</S.DeleteLabel>
          </TouchableOpacity>
        </S.Header>
        <S.Upload>
          <Photo uri={image} />
          <S.PickImageButton
            onPress={handlePickerImage}
            title="Carregar"
            type="secondary"
          />
        </S.Upload>

        <S.Form>
          <S.InputGroup>
            <S.Label>Nome</S.Label>
            <Input value={name} onChangeText={setName} />
          </S.InputGroup>

          <S.InputGroup>
            <S.InputGroupHeader>
              <S.Label>Descrição</S.Label>
              <S.MaxCharacters>0 de 60 caracteres</S.MaxCharacters>
            </S.InputGroupHeader>
            <Input
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={60}
              style={{ height: 80 }}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Tamanhos e preços</S.Label>
            <InputPrice
              value={priceSizeP}
              onChangeText={setPriceSizeP}
              size="P"
            />
            <InputPrice
              value={priceSizeM}
              onChangeText={setPriceSizeM}
              size="M"
            />
            <InputPrice
              value={priceSizeG}
              onChangeText={setPriceSizeG}
              size="G"
            />
          </S.InputGroup>
          <Button
            onPress={handleAdd}
            isLoading={isLoading}
            title="Cadastrar pizza"
          />
        </S.Form>
      </ScrollView>
    </S.Container>
  );
};
