import Layout from "@/components/layouts/Layout";
import { useIndexTemplate } from "@/components/page-templates/index/useIndexTemplate";
import JapaneseAnalyzerForm from "@/modules/japanese-wordwrap/components/JapaneseWordwrapForm";
import React, { VFC } from "react";

interface IndexTemplateProps {}

const IndexTemplate: VFC<IndexTemplateProps> = ({}) => {
  const { service } = useIndexTemplate();

  return (
    <Layout>
      <JapaneseAnalyzerForm service={service} />
    </Layout>
  );
};

export default IndexTemplate;
