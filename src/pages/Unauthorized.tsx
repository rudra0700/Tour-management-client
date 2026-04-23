import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div>
      <h1>Go to hell, MotherFucker!!!</h1>
      <Link to={"/"}>
        <Button>Get back to your fucking home</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
