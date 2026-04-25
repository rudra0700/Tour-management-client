import MultipleImageUploader from "@/components/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import {
  useAddTourMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { formatDate, formatISO } from "date-fns";
import { ChevronDownIcon, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddTour = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      division: "",
      tourType: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      included: [{ value: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "included",
  });
  console.log(fields);
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
  const [addTour] = useAddTourMutation();
  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);

  const divisionOptions = divisionData?.data?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    }),
  );

  const tourTypeOptions = tourTypeData?.data?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    }),
  );

  const handleSubmit = async (data) => {
    const toastId = toast.loading("Tour adding...");
    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included: data.included.map((item: { value: string }) => item.value),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(tourData));
    images.forEach((image) => formData.append("files", image as File));

    // try {
    //   const result = await addTour(formData).unwrap();
    //   if (result.success) {
    //     toast.success("Tour added successfully", { id: toastId });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    console.log(tourData);
  };
  return (
    <div className="">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Input
          {...form.register("title")}
          id="title"
          type="text"
          placeholder="Tour title"
          required
        />{" "}
        <div className="flex gap-6 mt-5">
          <Controller
            control={form.control}
            name="division"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={divisionLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {divisionOptions?.map(
                      (item: { value: string; label: string }) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Controller
            control={form.control}
            name="tourType"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={tourTypeLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tour Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {tourTypeOptions?.map(
                      (item: { value: string; label: string }) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex gap-5 mt-5">
          <Controller
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!field.value}
                    className="flex-1 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {field.value ? (
                      formatDate(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    defaultMonth={field.value}
                    disabled={(date) =>
                      date <
                      new Date(new Date().setDate(new Date().getDate() - 1))
                    }
                  />
                </PopoverContent>
              </Popover>
            )}
          />

          <Controller
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!field.value}
                    className="flex-1 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {field.value ? (
                      formatDate(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    defaultMonth={field.value}
                    disabled={(date) =>
                      date <
                      new Date(new Date().setDate(new Date().getDate() - 1))
                    }
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
        <div className="flex gap-5">
          <Textarea
            className="mt-6 h-51.25 flex-1"
            {...form.register("description")}
            id="description"
            placeholder="Write something"
            required
          />
          <div className="flex-1 mt-6">
            <MultipleImageUploader onChange={setImages} />
          </div>
        </div>
        <Button className="mt-3" type="submit">
          Add Tour
        </Button>
        <div className="flex justify-between items-center mt-4">
          <p>Includes</p>
          <Button type="button" onClick={() => append({ value: "" })}>
            <Plus />
          </Button>
        </div>
        <div>
          {fields.map((field, index) => (
            <div className="flex mt-3 gap-4">
              <Input
                {...form.register(`included.${index}.value`)}
                key={field.id}
                type="text"
                placeholder=""
                required
              />
              <Trash onClick={() => remove(index)} />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default AddTour;
