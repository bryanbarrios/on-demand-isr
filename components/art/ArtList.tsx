import { FC, useState } from "react";
import { SimpleGrid, useDisclosure } from "@chakra-ui/react";
import ArtCard from "./ArtCard";
import { Art } from "@/types";
import Modal from "@/components/Modal";
import BlurImage from "../BlurImage";

interface ArtListProps {
  arts: Art[];
}

const ArtList: FC<ArtListProps> = ({ arts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState<Art | null>(null);

  return (
    <>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="10">
        {arts.map((art) => (
          <ArtCard
            key={art.id}
            art={art}
            onClick={() => {
              setModalData(art);
              onOpen();
            }}
            cursor="pointer"
          />
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <BlurImage
          src={modalData?.artUrl ?? ""}
          width="600"
          height="600"
          layout="responsive"
          objectFit="cover"
          priority
        />
      </Modal>
    </>
  );
};

export default ArtList;
