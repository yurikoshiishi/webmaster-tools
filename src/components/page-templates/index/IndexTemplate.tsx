import Layout from "@/components/layouts/Layout";
import { useIndexTemplate } from "@/components/page-templates/index/useIndexTemplate";
import JapaneseAnalyzerForm from "@/modules/japanese-analyzer/components/JapaneseAnalyzerForm";
import React, { VFC } from "react";

interface IndexTemplateProps {}

const IndexTemplate: VFC<IndexTemplateProps> = ({}) => {
  const { isLoading, service } = useIndexTemplate();

  return (
    <Layout isLoading={isLoading}>
      {service && <JapaneseAnalyzerForm service={service} />}
    </Layout>
  );
};

export default IndexTemplate;
