import { AddTourTypeModal } from "@/components/AddTourTypeModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteTourTypeMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const AddTourType = () => {
  const { data } = useGetTourTypesQuery(undefined);
  const [deleteTourType] = useDeleteTourTypeMutation();
  console.log(data?.data[0]._id);

  const handleDelete = async (id: string) => {
    console.log(id);
    const toastId = toast.loading("Tour type deleting");
    try {
      const result = await deleteTourType({ id }).unwrap();
      if (result.success) {
        toast.success("Tour type deleted successfully", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full max-w-6xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Name</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((item: { name: string; _id: string }) => (
            <TableRow>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="text-right">
                <DeleteConfirmationModal onConfirm={() => handleDelete(item._id)}>
                  <Button>
                    <Trash />
                  </Button>
                </DeleteConfirmationModal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AddTourType;
