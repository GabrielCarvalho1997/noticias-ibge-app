import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Pressable, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/FontAwesome"; // Importe o ícone
import tailwind from "twrnc";
import { TextInput } from "../ui/text-input";

interface FilterContainerProps {
  setFilters: (filters: any) => void;
}

type FilterProps = {
  date: {
    from: Date | null;
    to: Date | null;
  };
  busca: string;
  introsize: number;
  destaque: boolean;
};

const FilterContainer = ({ setFilters }: FilterContainerProps) => {
  const [modalVisible, setModalVisible] = useState(false);

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

  const clearFilters = () => {
    reset();
  };

  const onSubmit = (data: FilterProps) => {
    const filters: any = {
      de: data.date.from?.toISOString(),
      ate: data.date.to?.toISOString(),
      destaque: data.destaque,
    };

    if (data.introsize) {
      filters.introsize = data.introsize;
    }

    if (data.busca) {
      filters.busca = data.busca;
    }

    setFilters(filters);
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={tailwind`w-full h-full flex justify-center items-center mt-6 relative`}
        >
          <View
            style={tailwind`w-full rounded-xl px-5 py-8 pt-20 items-center shadow-xl gap-6 bg-purple-700 relative`}
          >
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={tailwind`absolute top-4 right-4`}
            >
              <Icon name="close" size={30} color="#ffffff" />
            </Pressable>
            <View style={tailwind`rounded-xl bg-purple-300 py-4`}>
              <CalendarPicker
                startFromMonday
                allowRangeSelection
                maxDate={new Date()}
                todayBackgroundColor="#d8b4fe"
                todayTextStyle={{ color: "#000000" }}
                selectedDayTextColor="#ffffff"
                selectedDayColor="#3b0764"
                weekdays={["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"]}
                months={[
                  "Janeiro",
                  "Fevereiro",
                  "Março",
                  "Abril",
                  "Maio",
                  "Junho",
                  "Julho",
                  "Agosto",
                  "Setembro",
                  "Outubro",
                  "Novembro",
                  "Dezembro",
                ]}
                previousTitle="Anterior"
                nextTitle="Próximo"
                onDateChange={(date, type) => {
                  if (type === "START_DATE") {
                    setValue("date", { from: date, to: getValues("date").to });
                  } else {
                    setValue("date", {
                      from: getValues("date").from,
                      to: date,
                    });
                  }
                }}
              />
            </View>
            <TextInput
              {...register("busca")}
              placeholder="Insira um termo de busca"
              style={tailwind`w-full bg-purple-300 rounded-full`}
            />
            <TextInput
              {...register("destaque")}
              placeholder="Tamanho do texto"
              keyboardType="numeric"
              style={tailwind`w-full bg-purple-300 rounded-full`}
            />
            {/* <Switch
              value={getValues("destaque")}
              onValueChange={(value) => setValue("destaque", value)}
            /> */}
            <View style={tailwind`w-full flex-row justify-around items-center`}>
              <Pressable
                onPress={clearFilters}
                style={tailwind`w-32 h-10 rounded-full justify-center items-center bg-red-500`}
              >
                <Text>Limpar</Text>
              </Pressable>

              <Pressable
                onPress={handleSubmit(onSubmit)}
                style={tailwind`w-32 h-10 rounded-full justify-center items-center bg-purple-500`}
              >
                <Text>Filtrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={tailwind`w-full flex-row justify-around items-center mt-4`}>
        <Pressable
          style={tailwind`w-9/10 rounded-full p-3 bg-purple-950`}
          onPress={() => setModalVisible(true)}
        >
          <Text style={tailwind`text-white font-bold text-center`}>
            Filtros
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FilterContainer;
