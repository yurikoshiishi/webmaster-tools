import { JapaneseAnalyzerService } from "@/modules/japanese-analyzer/services";
import { ArrowRightAltOutlined } from "@mui/icons-material";
import { Button, TextField, TextFieldProps } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, VFC } from "react";

interface JapaneseAnalyzerFormProps {
  service: JapaneseAnalyzerService;
}

const textFieldOptions: TextFieldProps = {
  variant: "outlined",
  fullWidth: true,
  multiline: true,
  rows: 5,
};

const JapaneseAnalyzerForm: VFC<JapaneseAnalyzerFormProps> = ({ service }) => {
  const [originalText, setOriginalText] = useState<string>("");
  const [seperatedText, setSeperatedText] = useState<string>("");

  const onChangeOriginal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const seperatedText = service.applySeperator(originalText);
    setSeperatedText(seperatedText);
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

export default JapaneseAnalyzerForm;
