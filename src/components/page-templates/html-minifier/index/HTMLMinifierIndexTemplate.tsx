import Layout from "@/components/layouts/Layout";
import { useHTMLMinifierIndexTemplate } from "@/components/page-templates/html-minifier/index/useHTMLMinifierIndexTemplate";
import HTMLMinifierForm from "@/modules/html-minifier/components/HTMLMinifierForm";
import React, { VFC } from "react";

interface HTMLMinifierIndexTemplateProps {}

const HTMLMinifierIndexTemplate: VFC<HTMLMinifierIndexTemplateProps> = ({}) => {
  const { isLoading, service } = useHTMLMinifierIndexTemplate();
  return (
    <Layout isLoading={isLoading}>
      {service && <HTMLMinifierForm service={service} />}
    </Layout>
  );
};

export default HTMLMinifierIndexTemplate;
