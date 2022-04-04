import { FC } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import ArtCard from "./ArtCard";
import { Art } from "@/types";

interface ArtListProps {
  arts: Art[];
}

const ArtList: FC<ArtListProps> = ({ arts }) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="10">
      {arts.map((art) => (
        <ArtCard key={art.id} art={art} />
      ))}
    </SimpleGrid>
  );
};

export default ArtList;
