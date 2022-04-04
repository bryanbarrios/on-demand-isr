import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  DropzoneOptions,
  useDropzone,
  FileRejection,
  FileError,
  ErrorCode,
} from "react-dropzone";
import {
  Center,
  Icon,
  Text,
  Avatar,
  AvatarGroup,
  Flex,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FiFile, FiFilePlus } from "react-icons/fi";
import { DROPZONE_ERRORS } from "@/constants";
import { v4 as uuid } from "uuid";

interface DropzoneProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  initialText?: string;
  dragActiveText?: string;
  options?: DropzoneOptions;
}

const Dropzone: FC<DropzoneProps> = ({
  name,
  initialText = "Drag and drop or click here to pick a file",
  dragActiveText = "Drop the file here...",
  options,
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, unregister, setValue, watch } = useFormContext();
  const files: File[] = watch(name);

  const onDrop = useCallback(
    (droppedFiles, rejectedFiles) => {
      setValue(name, droppedFiles, { shouldValidate: true });

      rejectedFiles.length > 0
        ? rejectedFiles.map((file: FileRejection) =>
            file.errors.map((error: FileError) => {
              switch (error.code) {
                case ErrorCode.FileTooLarge:
                  return setErrorMessage(
                    DROPZONE_ERRORS.FILE_SIZE_IS_TOO_LARGE_MESSAGE
                  );
                case ErrorCode.FileInvalidType:
                  return setErrorMessage(
                    DROPZONE_ERRORS.UNSUPPORTED_FILE_FORMAT_MESSAGE
                  );
                default:
                  return setErrorMessage(error.message);
              }
            })
          )
        : setErrorMessage(null);
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...options,
  });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  const dropText = isDragActive ? dragActiveText : initialText;
  const activeBg = isDragActive ? "gray.50" : "transparent";
  const borderColor = isDragActive ? "gray.400" : "gray.300";
  const fileIcon = isDragActive ? FiFilePlus : FiFile;

  const renderFiles = () => (
    <Flex flexDir="column" mb="2">
      {files.length > 1 ? (
        <AvatarGroup spacing="-4" max={4}>
          {files.map((file) => (
            <Avatar
              key={uuid()}
              src={URL.createObjectURL(file)}
              size="md"
              objectFit="cover"
              icon={<Icon as={FiFile} />}
            />
          ))}
        </AvatarGroup>
      ) : (
        <Avatar
          src={URL.createObjectURL(files[0])}
          size="md"
          objectFit="cover"
          icon={<Icon as={FiFile} />}
          mx="auto"
        />
      )}
      <Text mt="2" color="gray.500" fontSize="xs" textAlign="center">
        {files.length} selected file(s)
      </Text>
    </Flex>
  );

  return (
    <Center
      {...getRootProps()}
      bg={activeBg}
      border="2px dashed"
      borderColor={borderColor}
      borderRadius="xl"
      p="6"
      w="full"
      display="flex"
      flexDir="column"
    >
      <input {...props} {...getInputProps()} />
      {files && files.length > 0 ? (
        renderFiles()
      ) : (
        <Icon as={fileIcon} w="8" h="8" color="gray.500" mb="2" />
      )}
      <Text color="gray.500">{dropText}</Text>
      {errorMessage && (
        <Text mt="1" color="red" fontSize="sm">
          {errorMessage}
        </Text>
      )}
    </Center>
  );
};

export default Dropzone;
