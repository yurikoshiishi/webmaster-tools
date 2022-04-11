import BorderedBox from "@/components/ui/BorderedBox";
import { useNotification } from "@/hooks/useNotification";
import { copyToClipboard } from "@/lib/clipboard";
import { log } from "@/lib/logger";
import { JapaneseWordwrapService } from "@/modules/japanese-wordwrap/services";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import React, { useState, VFC } from "react";

interface JapaneseWordwrapFormProps {
  service: JapaneseWordwrapService;
}

const textareaProps: TextareaProps = {
  rows: 12,
  resize: "none",
  variant: "unstyled",
};

const JapaneseWordwrapForm: VFC<JapaneseWordwrapFormProps> = ({ service }) => {
  const [originalText, setOriginalText] = useState<string>("");
  const [seperatedText, setSeperatedText] = useState<string>("");
  const { showNotification } = useNotification();

  const onChangeOriginal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOriginalText(e.target.value);
  };

  const onChangeSeperated = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSeperatedText(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const seperatedText = service.applyWordwrap(
      originalText,
      service.getOptions()
    );
    setSeperatedText(seperatedText);

    try {
      copyToClipboard(seperatedText);
      showNotification({
        id: "japanesw-wordwrap-copy",
        title: "Copied to clipboard!",
        status: "success",
      });
    } catch (error) {
      log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <BorderedBox
        height={"350px"}
        gap={2}
        display={"flex"}
        alignItems={"stretch"}
      >
        <Box width={"50%"} p={4}>
          <FormControl>
            <FormLabel>Original</FormLabel>
            <Textarea
              {...textareaProps}
              placeholder={`ここに文章を入力してください\nPlease enter the text you would like to convert`}
              value={originalText}
              onChange={onChangeOriginal}
            />
          </FormControl>
        </Box>
        <Divider orientation="vertical" />
        <Box width={"50%"} p={4}>
          <FormControl>
            <FormLabel>Converted</FormLabel>
            <Textarea
              {...textareaProps}
              placeholder={`ここ#に#文章#を#入力#し#て#ください\nPlease# #enter# #the# #text# #you# #would# #like# #to# #convert#`}
              value={seperatedText}
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
  );
};

export default JapaneseWordwrapForm;
