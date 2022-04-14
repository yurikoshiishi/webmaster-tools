import BorderedBox from "@/components/ui/BorderedBox";
import TextLink from "@/components/ui/TextLink";
import { Attribution } from "@/modules";
import { ListItem, UnorderedList, Text, Box, Divider } from "@chakra-ui/react";
import React, { VFC } from "react";

interface AttributionsProps {
  items: Attribution[];
}

const Attributions: VFC<AttributionsProps> = ({ items }) => {
  return (
    <BorderedBox>
      <Box p={4}>
        <Text as="h2">Attributions</Text>
      </Box>
      <Divider />
      <Box p={4}>
        <UnorderedList>
          {items.map((item) => (
            <ListItem key={item.name}>
              {item.name} -{" "}
              <TextLink href={item.href} isExternal>
                {item.href}
              </TextLink>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </BorderedBox>
  );
};

export default Attributions;
