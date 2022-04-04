import { GetStaticProps, NextPage } from "next";
import {
  useDisclosure,
  IconButton,
  Icon,
  Container,
  useToast,
} from "@chakra-ui/react";
import { supabase } from "@/lib/supabase";
import safeJsonStringify from "safe-json-stringify";
import ArtForm from "@/components/art/ArtForm";
import ArtList from "@/components/art/ArtList";
import Header from "@/components/Header";
import { FiPlus } from "react-icons/fi";
import { Art } from "@/types";
import Modal from "@/components/Modal";

interface Props {
  arts: Art[];
}

const Home: NextPage<Props> = ({ arts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <Container maxW="6xl" mx="auto" py="6">
      <IconButton
        position="fixed"
        zIndex="sticky"
        bottom="5"
        right="5"
        onClick={onOpen}
        aria-label="Add art"
        w="12"
        h="12"
        colorScheme="twitter"
        icon={<Icon as={FiPlus} w="7" h="7" color="white" />}
        rounded="full"
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="outside"
        mode="bottomSheet"
      >
        <ArtForm
          onSubmit={() => {
            onClose();
            toast({
              title: "Art submitted",
              description: "Reload the page.",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          }}
        />
      </Modal>
      <Header mb="6" />
      <ArtList arts={arts} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await supabase.from<Art>("art").select("*").order("title");
  const stringifiedData = safeJsonStringify(data ?? []);
  const arts = JSON.parse(stringifiedData);

  return {
    props: { arts },
  };
};

export default Home;
