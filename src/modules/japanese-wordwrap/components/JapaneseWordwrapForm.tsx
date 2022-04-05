import { useNotification } from "@/hooks/useNotification";
import { copyToClipboard } from "@/lib/clipboard";
import { log } from "@/lib/logger";
import { JapaneseWordwrapService } from "@/modules/japanese-wordwrap/services";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import { Button, TextField, TextFieldProps } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, VFC } from "react";

interface JapaneseWordwrapFormFormProps {
  service: JapaneseWordwrapService;
}

const textFieldOptions: TextFieldProps = {
  variant: "outlined",
  fullWidth: true,
  multiline: true,
  rows: 5,
};

const JapaneseWordwrapForm: VFC<JapaneseWordwrapFormFormProps> = ({
  service,
}) => {
  const [originalText, setOriginalText] = useState<string>("");
  const [seperatedText, setSeperatedText] = useState<string>("");
  const { showNotification } = useNotification();

  const onChangeOriginal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalText(e.target.value);
  };

  const onChangeSeperated = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeperatedText(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const seperatedText = service.applySeperator(originalText);
    setSeperatedText(seperatedText);

    try {
      copyToClipboard(seperatedText);
      showNotification("Copied to clipboard!", {
        variant: "default",
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
        <TextField
          {...textFieldOptions}
          label="original"
          value={originalText}
          onChange={onChangeOriginal}
        />
        <ArrowRightAltOutlined />
        <TextField
          label="converted"
          {...textFieldOptions}
          value={seperatedText}
          onChange={onChangeSeperated}
        />
      </Box>
      <Box mt={2}>
        <Button type="submit" variant="contained">
          Convert
        </Button>
      </Box>
    </form>
  );
};

export default JapaneseWordwrapForm;
