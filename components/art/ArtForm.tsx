import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Textarea,
  Wrap,
  FormErrorMessage,
  Text,
  FormHelperText,
} from "@chakra-ui/react";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  REQUIRED_MESSAGE,
  MAX_FILE_SIZE,
  SUPPORTED_FORMATS,
  INVALID_DATE_MESSAGE,
} from "@/constants";
import Dropzone from "@/components/Dropzone";
import { parseDateString } from "@/lib/date";
import { HttpMethod } from "@/types";
import { uploadImage } from "@/lib/upload-image";

interface ArtForm {
  title: string;
  description: string;
  artist: string;
  creationDate: Date;
  art: FileList;
}

const schema = yup.object({
  title: yup.string().required(REQUIRED_MESSAGE),
  description: yup.string().required(REQUIRED_MESSAGE),
  artist: yup.string().required(REQUIRED_MESSAGE),
  creationDate: yup
    .date()
    .transform(parseDateString)
    .typeError(INVALID_DATE_MESSAGE)
    .max(new Date(), INVALID_DATE_MESSAGE),
  art: yup.mixed<File[]>().required(REQUIRED_MESSAGE),
});

interface ArtFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArtForm: FC<ArtFormProps> = ({ isOpen, onClose }) => {
  const methods = useForm<ArtForm>({
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (validatedData) => {
    const { art, ...data } = validatedData;
    const artUrl = await uploadImage(art);
    const response = await fetch("/api/art", {
      method: HttpMethod.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ artUrl, ...data }),
    });

    response.ok && onClose();
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      isCentered
      scrollBehavior="outside"
      /* motionPreset="slideInBottom" */
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(16px) hue-rotate(90deg)"
      />
      <ModalContent
        mt="auto"
        mb={["0px", "auto"]}
        borderRadius={["1.5rem 1.5rem 0px 0px", "1.5rem"]}
      >
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <ModalHeader
              pb="0"
              letterSpacing="tight"
              bgGradient="linear(to-r, blue.400, cyan.400)"
              bgClip="text"
              fontSize="3xl"
              fontWeight="black"
            >
              Add and art
            </ModalHeader>
            <Text
              px="6"
              letterSpacing="tight"
              pb="1"
              bgGradient="linear(to-r, blue.400, cyan.400)"
              bgClip="text"
              fontWeight="medium"
              fontSize="lg"
            >
              Feel free to add the artwork of your favorite artist.
            </Text>
            <ModalCloseButton
              bgColor="gray.50"
              _hover={{ bgColor: "gray.100" }}
              w="10"
              h="10"
              borderRadius="full"
            />
            <ModalBody>
              <Wrap spacing="3">
                <FormControl isInvalid={Boolean(errors.title)}>
                  <FormLabel fontSize="sm">Title</FormLabel>
                  <Input
                    variant="outline"
                    placeholder="What's the masterpiece?"
                    {...register("title")}
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.description)}>
                  <FormLabel fontSize="sm">Description</FormLabel>
                  <Textarea
                    variant="outline"
                    placeholder="Tell us about the art"
                    resize="none"
                    {...register("description")}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.artist)}>
                  <FormLabel fontSize="sm">Artist</FormLabel>
                  <Input
                    variant="outline"
                    placeholder="Who was the artist?"
                    {...register("artist")}
                  />
                  <FormErrorMessage>
                    {errors.artist && errors.artist.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.creationDate)}>
                  <FormLabel fontSize="sm">Creation date</FormLabel>
                  <Input
                    variant="outline"
                    type="date"
                    {...register("creationDate")}
                  />
                  <FormErrorMessage>
                    {errors.creationDate && errors.creationDate.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.art)}>
                  <FormLabel fontSize="sm">Art</FormLabel>
                  <Dropzone
                    name="art"
                    options={{
                      accept: SUPPORTED_FORMATS,
                      maxSize: MAX_FILE_SIZE,
                      multiple: false,
                    }}
                  />
                  <FormHelperText>
                    PNG, JPG, GIF up to 5MB (recommended size: 1080px x 1080px)
                  </FormHelperText>
                  <FormErrorMessage>
                    {errors.art && errors.art.message}
                  </FormErrorMessage>
                </FormControl>
              </Wrap>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="twitter"
                isLoading={isSubmitting}
                borderRadius="xl"
                w="full"
              >
                Submit
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default ArtForm;
