import Layout from "@/components/layouts/Layout";
import Attributions from "@/components/ui/Attributions";
import { htmlFormatterService } from "@/modules/html-formatter/services";
import HTMLFormatterForm from "@/modules/html-formatter/components/HTMLFormatterForm";
import { htmlFormatterModule } from "@/modules/html-formatter/constants";
import { Box } from "@chakra-ui/react";
import React, { VFC } from "react";

interface HTMLFormatterIndexTemplateProps {}

const HTMLFormatterIndexTemplate: VFC<
  HTMLFormatterIndexTemplateProps
> = ({}) => {
  return (
    <Layout
      headProps={{
        title: htmlFormatterModule.name,
      }}
    >
      <HTMLFormatterForm service={htmlFormatterService} />
      {htmlFormatterModule.attributions?.length && (
        <Box mt={8}>
          <Attributions items={htmlFormatterModule.attributions} />
        </Box>
      )}
    </Layout>
  );
};

export default HTMLFormatterIndexTemplate;
