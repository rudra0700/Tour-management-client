import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateDivisionMutation } from "@/redux/features/division/division.api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddDivision() {
  const form = useForm();
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [division] = useCreateDivisionMutation();

  const addDivision = async (data) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    const toastId = toast.loading("Tour type adding....");
    try {
      const result = await division(formData).unwrap();
      console.log(result);
      if (result.success) {
        toast.success("Division added successfully", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="border-white bg-white text-black p-1 rounded-md">
        Add Tour Type
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-5"
          id="division"
          onSubmit={form.handleSubmit(addDivision)}
        >
          <Input
            {...form.register("name")}
            id="name"
            type="text"
            placeholder="Add Division"
            required
          />
          <Textarea
            {...form.register("description")}
            id="description"
            placeholder="Express your thoughts"
            required
          />
        </form>
        <SingleImageUploader onChange={setImage} />
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button disabled={!image} form="division">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
