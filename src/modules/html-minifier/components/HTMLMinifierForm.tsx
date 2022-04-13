import BorderedBox from "@/components/ui/BorderedBox";
import { useNotification } from "@/hooks/useNotification";
import { copyToClipboard } from "@/lib/clipboard";
import { log } from "@/lib/logger";
import { HTMLMinifierService } from "@/modules/html-minifier/services";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import React, { useEffect, useState, VFC } from "react";

interface HTMLMinifierFormProps {
  service: HTMLMinifierService;
}

const textareaProps: TextareaProps = {
  rows: 12,
  resize: "none",
  variant: "unstyled",
  tabIndex: -1,
};

const HTMLMinifierForm: VFC<HTMLMinifierFormProps> = ({ service }) => {
  const [originalText, setOriginalText] = useState<string>("");
  const [convertedText, setConvertedText] = useState<string>("");
  const { showNotification } = useNotification();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const history = service.getHistory();
    if (!history.length) {
      return;
    }

    setOriginalText(history[0].originalHTML);
    setConvertedText(history[0].minifiedHTML);
  }, [service]);

  const onChangeOriginal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOriginalText(e.target.value);
  };

  const onChangeSeperated = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConvertedText(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const convertedText = await service.minify(
      originalText,
      service.getOptions()
    );
    setConvertedText(convertedText);

    try {
      copyToClipboard(convertedText);
      showNotification({
        id: "html-minifier-copy",
        title: "Copied to clipboard!",
        status: "success",
      });
    } catch (error) {
      log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <BorderedBox height="350px" gap={2} display="flex" alignItems="stretch">
          <Box width="50%" p={4}>
            <FormControl>
              <FormLabel>Original</FormLabel>
              <Textarea
                {...textareaProps}
                placeholder={`<div>\n\t<p>Hello World!</p>\n</div>`}
                value={originalText}
                onChange={onChangeOriginal}
              />
            </FormControl>
          </Box>
          <Divider orientation="vertical" />
          <Box width="50%" p={4}>
            <FormControl>
              <FormLabel>Converted</FormLabel>
              <Textarea
                {...textareaProps}
                placeholder="<div><p>Hello World!</p></div>"
                value={convertedText}
                onChange={onChangeSeperated}
              />
            </FormControl>
          </Box>
        </BorderedBox>
        <Box mt={4}>
          <Button type="submit" variant="solid">
            Convert
          </Button>
        </Box>
      </form>
    </>
  );
};

export default HTMLMinifierForm;
