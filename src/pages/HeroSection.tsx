import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";

interface Hero12Props {
  className?: string;
}

const HeroSection = ({ className }: Hero12Props) => {
  const [selectedDivision, setSelectedDivision] = useState<string | undefined>(
    undefined,
  );

  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionQuery(undefined);

  const divisionOptions = divisionData?.data.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    }),
  );
  return (
    <section className={cn("relative overflow-hidden py-32", className)}>
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="mask-[radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="logo"
                className="h-16"
              />
            </div>
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Explore the beauty of{" "}
                <span className="text-primary">Bangladesh</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Experience Bangladesh: Sundarbans tigers, Cox’s Bazar beach,
                lush Sylhet tea gardens, historic Bagerhat mosques, vibrant
                Dhaka culture, serene Rangamati hills, ancient Paharpur ruins,
                adventurous Sajek valley, mangrove forests, cultural heritage,
                trekking, biodiversity, scenic landscapes, bustling markets,
                rich history, authentic experiences
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Select
                
                onValueChange={(value) => setSelectedDivision(value)}
                value={selectedDivision ? selectedDivision : ""}
                disabled={divisionLoading}
              >
                <SelectTrigger className="w-75">
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

              {selectedDivision ? (
                <Button
                  asChild
                  className="shadow-sm transition-shadow hover:shadow"
                >
                  <Link to={`/tours?division=${selectedDivision}`}>Search</Link>
                </Button>
              ) : (
                <Button
                  disabled
                  className="shadow-sm transition-shadow hover:shadow"
                >
                  Search
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
