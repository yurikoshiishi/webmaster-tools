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
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  UseSliderProps,
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

  const onChangeThreshold: UseSliderProps["onChange"] = (value) => {
    service.updateOptions({
      ...options,
      threshold: value,
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
          <Box mt={2} display="flex" gap={4} justifyContent="flex-end">
            {options.type === "seperator" ? (
              <Input value={options.seperator} onChange={onChangeSeperator} />
            ) : (
              <>
                <Input
                  value={options.wrapper[0]}
                  onChange={onChangeWrapperStart}
                />
                <Input
                  value={options.wrapper[1]}
                  onChange={onChangeWrapperEnd}
                />
              </>
            )}
          </Box>
        </FormControl>
      </Box>
      <Divider />
      <Box p={4}>
        <FormControl>
          <Flex justifyContent="space-between" alignItems="start" gap={4}>
            <FormLabel>Threshold </FormLabel>
            <Text>{options.threshold}</Text>
          </Flex>
          <Slider
            aria-label="threshold"
            step={10}
            value={options.threshold}
            min={service.minThreshold}
            max={service.maxThreshold}
            onChange={onChangeThreshold}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
      </Box>
    </BorderedBox>
  );
};

export default JapaneseWordwrapOptionsForm;
