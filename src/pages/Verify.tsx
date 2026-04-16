import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  // const [email] = useState(location.state);
  console.log(email);
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);
  return <div>from verified page</div>;
};

export default Verify;
