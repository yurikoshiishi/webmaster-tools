import { Button, Link, LinkProps } from "@chakra-ui/react";
import React, { VFC } from "react";

interface TextLinkProps extends LinkProps {}

const TextLink: VFC<TextLinkProps> = ({ children, ...props }) => {
  return (
    <Link {...props}>
      <Button fontWeight="normal" as="span" variant="link">
        {children}
      </Button>
    </Link>
  );
};

export default TextLink;
