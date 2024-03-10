import React from "react";
import { useForm } from "react-hook-form";
import { Switch } from "../ui/switch";
import { TextInput } from "../ui/text-input";

type FilterProps = {
  date: {
    from: Date | null;
    to: Date | null;
  };
  busca: string;
  introsize: number;
  destaque: boolean;
};

const FilterContainer = () => {
  const { register, handleSubmit, reset, getValues, setValue } =
    useForm<FilterProps>({
      mode: "all",
      defaultValues: {
        date: {
          from: null,
          to: null,
        },
        busca: "",
        introsize: undefined,
        destaque: true,
      },
    });
  return (
    <>
      <TextInput
        {...register("busca")}
        placeholder="Insira um termo de busca"
      />
      <Switch
        value={getValues("destaque")}
        onValueChange={(value) => setValue("destaque", value)}
      />
    </>
  );
};

export default FilterContainer;
