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
      title: "Dhaka to Rajshahi Heritage Tour",
      location: "Dhaka",
      costFrom: 1200,
      departureLocation: "Dhaka",
      arrivalLocation: "Rajshahi",
      maxGuest: "20",
      minAge: "18",
      division: "",
      tourType: "",
      description:
        "Discover the historical treasures of Rajshahi, known as the 'Silk City' of Bangladesh. Explore ancient Buddhist ruins at Paharpur, visit the magnificent Puthia Palace complex, and experience the rich cultural heritage of north Bengal. Perfect for history enthusiasts and cultural explorers.",
      startDate: new Date(),
      endDate: new Date(),
      included: [
        { value: "Accommodation for 2 nights" },
        { value: "All meals (breakfast, lunch, dinner)" },
        { value: "Transportation (AC bus)" },
        { value: "Professional tour guide" },
        { value: "Entry fees to all historical sites" },
        { value: "Paharpur monastery visit" },
      ],
      excluded: [
        { value: "Personal expenses" },
        { value: "Extra activities not mentioned" },
        { value: "Travel insurance" },
        { value: "Shopping expenses" },
        { value: "Photography charges at monuments" },
      ],
      amenities: [
        { value: "Comfortable hotel rooms" },
        { value: "Free WiFi" },
        { value: "Air conditioning" },
        { value: "Local transportation" },
        { value: "Cultural performance evening" },
      ],
      tourPlan: [
        { value: "Day 1: Arrival in Rajshahi and Puthia Palace complex tour" },
        { value: "Day 2: Paharpur Buddhist monastery and Mahasthangarh visit" },
        { value: "Day 3: Rajshahi city tour and silk weaving centers" },
      ],
    },
  });

  const {
    fields: includedFields,
    append: includedAppend,
    remove: includedRemove,
  } = useFieldArray({
    control: form.control,
    name: "included",
  });

  const {
    fields: excludedFields,
    append: excludedAppend,
    remove: excludedRemove,
  } = useFieldArray({
    control: form.control,
    name: "excluded",
  });

  const {
    fields: amenitiesFields,
    append: amenitiesAppend,
    remove: amenitiesRemove,
  } = useFieldArray({
    control: form.control,
    name: "amenities",
  });

  const {
    fields: tourPlanFields,
    append: tourPlanAppend,
    remove: tourPlanRemove,
  } = useFieldArray({
    control: form.control,
    name: "tourPlan",
  });

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
    <div className="max-w-4xl w-full mx-auto p-4 border border-gray-500 rounded-lg">
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
        <div className="flex gap-6 mt-5">
          <Input
            {...form.register("location")}
            id="location"
            type="text"
            placeholder="Location"
            required
          />{" "}
          <Input
            {...form.register("costFrom")}
            id="costFrom"
            type="number"
            placeholder="Tour cost"
            required
          />{" "}
        </div>
        <div className="flex gap-6 mt-5">
          <Input
            {...form.register("departureLocation")}
            id="departureLocation"
            type="text"
            placeholder="Departure Location"
            required
          />{" "}
          <Input
            {...form.register("arrivalLocation")}
            id="arrivalLocation"
            type="text"
            placeholder="Arrival Location"
            required
          />{" "}
        </div>
        <div className="flex gap-6 mt-5">
          <Input
            {...form.register("maxGuest")}
            id="maxGuest"
            type="number"
            placeholder="Maximum Guest"
            required
          />{" "}
          <Input
            {...form.register("minAge")}
            id="minAge"
            type="number"
            placeholder="Minimum Age"
            required
          />{" "}
        </div>
        <div className="flex gap-6 mt-5">
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
        {/* Includes fields */}
        <div>
          <div className="flex justify-between items-center mt-4">
            <p>Includes</p>
            <Button type="button" onClick={() => includedAppend({ value: "" })}>
              <Plus />
            </Button>
          </div>
          <div>
            {includedFields.map((field, index) => (
              <div className="flex mt-3 gap-4">
                <Input
                  {...form.register(`included.${index}.value`)}
                  key={field.id}
                  type="text"
                  placeholder=""
                  required
                />
                <Trash onClick={() => includedRemove(index)} />
              </div>
            ))}
          </div>
        </div>
        {/* Excludes fields */}
        <div>
          <div className="flex justify-between items-center mt-4">
            <p>Excludes</p>
            <Button type="button" onClick={() => excludedAppend({ value: "" })}>
              <Plus />
            </Button>
          </div>
          <div>
            {excludedFields.map((field, index) => (
              <div className="flex mt-3 gap-4">
                <Input
                  {...form.register(`excluded.${index}.value`)}
                  key={field.id}
                  type="text"
                  placeholder=""
                  required
                />
                <Trash onClick={() => excludedRemove(index)} />
              </div>
            ))}
          </div>
        </div>
        {/* Amenities fields */}
        <div>
          <div className="flex justify-between items-center mt-4">
            <p>Amenities</p>
            <Button
              type="button"
              onClick={() => amenitiesAppend({ value: "" })}
            >
              <Plus />
            </Button>
          </div>
          <div>
            {amenitiesFields.map((field, index) => (
              <div className="flex mt-3 gap-4">
                <Input
                  {...form.register(`amenities.${index}.value`)}
                  key={field.id}
                  type="text"
                  placeholder=""
                  required
                />
                <Trash onClick={() => amenitiesRemove(index)} />
              </div>
            ))}
          </div>
        </div>
        {/* Tour plan fields */}
        <div>
          <div className="flex justify-between items-center mt-4">
            <p>Tour Plan</p>
            <Button type="button" onClick={() => tourPlanAppend({ value: "" })}>
              <Plus />
            </Button>
          </div>
          <div>
            {tourPlanFields.map((field, index) => (
              <div className="flex mt-3 gap-4">
                <Input
                  {...form.register(`tourPlan.${index}.value`)}
                  key={field.id}
                  type="text"
                  placeholder=""
                  required
                />
                <Trash onClick={() => tourPlanRemove(index)} />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTour;
