import Layout from "@/components/layouts/Layout";
import { useIndexTemplate } from "@/components/page-templates/index/useIndexTemplate";
import JapaneseAnalyzerForm from "@/modules/japanese-wordwrap/components/JapaneseWordwrapForm";
import { japaneseWordWrapModule } from "@/modules/japanese-wordwrap/constants";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { VFC } from "react";

const JapaneseWordwrapOptionsForm = dynamic(
  () =>
    import(
      "@/modules/japanese-wordwrap/components/JapaneseWordwrapOptionsForm"
    ),
  {
    ssr: false,
  }
);

interface IndexTemplateProps {}

const IndexTemplate: VFC<IndexTemplateProps> = ({}) => {
  const { service } = useIndexTemplate();

  return (
    <Layout
      headProps={{
        title: japaneseWordWrapModule.name,
      }}
    >
      <JapaneseAnalyzerForm service={service} />
      <Box mt={4}>
        <JapaneseWordwrapOptionsForm service={service} />
      </Box>
    </Layout>
  );
};

export default IndexTemplate;
