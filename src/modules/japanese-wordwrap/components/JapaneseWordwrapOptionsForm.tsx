import BorderedBox from "@/components/ui/BorderedBox";
import {
  ApplyWordwrapOptions,
  ApplyWordwrapOptionType,
  applyWordwrapOptionTypes,
  JapaneseWordwrapService,
} from "@/modules/japanese-wordwrap/services";
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState, VFC } from "react";

interface JapaneseWordwrapOptionsFormProps {
  service: JapaneseWordwrapService;
}

const JapaneseWordwrapOptionsForm: VFC<JapaneseWordwrapOptionsFormProps> = ({
  service,
}) => {
  const [options, setOptions] = useState<ApplyWordwrapOptions>(
    service.getOptions()
  );

  const onChangeType = (value: ApplyWordwrapOptionType) => {
    service.updateOptions({
      ...options,
      type: value,
    });
    setOptions(service.getOptions());
  };

  const onChangeSeperator = (e: React.ChangeEvent<HTMLInputElement>) => {
    service.updateOptions({
      ...options,
      seperator: e.target.value,
    });
    setOptions(service.getOptions());
  };

  const onChangeWrapperStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    service.updateOptions({
      ...options,
      wrapper: [e.target.value, options.wrapper[1]],
    });
    setOptions(service.getOptions());
  };

  const onChangeWrapperEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    service.updateOptions({
      ...options,
      wrapper: [options.wrapper[0], e.target.value],
    });
    setOptions(service.getOptions());
  };

  return (
    <BorderedBox>
      <Box p={4}>
        <Text>Options</Text>
      </Box>
      <Divider />
      <Box p={4}>
        <FormControl>
          <FormLabel>Text Modifier</FormLabel>
          <RadioGroup value={options.type} onChange={onChangeType}>
            <Stack spacing={5} direction="row">
              {applyWordwrapOptionTypes.map((type) => (
                <Radio key={type} value={type}>
                  {`${type[0].toUpperCase()}${type.substring(1, type.length)}`}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Box mt={2} display="flex" gap={4} justifyContent={"flex-end"}>
            {options.type === "seperator" ? (
              <Input
                // width={"auto"}
                value={options.seperator}
                onChange={onChangeSeperator}
              />
            ) : (
              <>
                <Input
                  // width={"auto"}
                  value={options.wrapper[0]}
                  onChange={onChangeWrapperStart}
                />
                <Input
                  // width={"auto"}
                  value={options.wrapper[1]}
                  onChange={onChangeWrapperEnd}
                />
              </>
            )}
          </Box>
        </FormControl>
      </Box>
    </BorderedBox>
  );
};

export default JapaneseWordwrapOptionsForm;
