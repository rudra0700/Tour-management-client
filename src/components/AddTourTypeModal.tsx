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
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { useAddTourTypeMutation} from "@/redux/features/tour/tour.api";
import { toast } from "sonner";

export function AddTourTypeModal() {
  const form = useForm();
  const [tourType] = useAddTourTypeMutation();
  
  const addTourType = async (data) => {
    const toastId = toast.loading("Tour type adding....");
    try {
      const result = await tourType({ name: data.name }).unwrap();
      if (result.success) {
        toast.success("Tour type added successfully", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <Dialog>
      <DialogTrigger className="border-white bg-white text-black p-1 rounded-md">
        Add Tour Type
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Tour Type</DialogTitle>
        </DialogHeader>
        <form id="tour-type" onSubmit={form.handleSubmit(addTourType)}>
          <Input
            {...form.register("name")}
            id="name"
            type="text"
            placeholder="Add tour type"
            required
          />
        </form>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button form="tour-type">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
