import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { useSearchParams } from "react-router";
const TourFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // this will work like useState in react. it will react in real time. so the variable down the line will get that instant value.
  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;

  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);

    
    const divisionOptions = divisionData?.data.map(
      (item: { _id: string; name: string }) => ({
        label: item.name,
        value: item._id,
      }),
    );
    
    const tourTypeOptions = tourTypeData?.data.map(
      (item: { _id: string; name: string }) => ({
        label: item.name,
        value: item._id,
      }),
    );
    // console.log(tourTypeData);

  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("division", value);
    setSearchParams(params);
  };

  const handleTourTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourType", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("division");
    params.delete("tourType");
    setSearchParams(params);
  };
  return (
    <div className="grid-1">
      <div className="flex justify-between items-center">
        <h3>Filters</h3>
        <Button onClick={handleClearFilter}>Clear</Button>
      </div>
      <Select
        onValueChange={handleDivisionChange}
        value={selectedDivision ? selectedDivision : ""}
        disabled={divisionLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Division" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {divisionOptions?.map((item: { value: string; label: string }) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={handleTourTypeChange}
        value={selectedTourType ? selectedTourType : ""}
        disabled={tourTypeLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Tour Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {tourTypeOptions?.map((item: { value: string; label: string }) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TourFilter;
