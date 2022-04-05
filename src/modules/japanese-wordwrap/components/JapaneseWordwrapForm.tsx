import { useNotification } from "@/hooks/useNotification";
import { copyToClipboard } from "@/lib/clipboard";
import { log } from "@/lib/logger";
import { JapaneseWordwrapService } from "@/modules/japanese-wordwrap/services";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import React, { useState, VFC } from "react";

interface JapaneseWordwrapFormFormProps {
  service: JapaneseWordwrapService;
}

const textareaProps: TextareaProps = {
  rows: 8,
  resize: "none",
};

const JapaneseWordwrapForm: VFC<JapaneseWordwrapFormFormProps> = ({
  service,
}) => {
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
    const seperatedText = service.applySeperator(originalText);
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
      <Box
        gap={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <FormControl>
          <FormLabel>Original</FormLabel>
          <Textarea
            {...textareaProps}
            value={originalText}
            onChange={onChangeOriginal}
          />
        </FormControl>
        <ArrowForwardIcon />
        <FormControl>
          <FormLabel>Converted</FormLabel>
          <Textarea
            {...textareaProps}
            value={seperatedText}
            onChange={onChangeSeperated}
          />
        </FormControl>
      </Box>
      <Box mt={4}>
        <Button type="submit" variant="solid">
          Convert
        </Button>
      </Box>
    </form>
  );
};

export default JapaneseWordwrapForm;
