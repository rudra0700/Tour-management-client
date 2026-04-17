import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") as string;
  const [confirmed, setConfirmed] = useState(false);
  const [timer, setTimer] = useState(5);

  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  // const [email] = useState(location.state);

  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Verifying Otp");
    const userInfo = {
      email,
      otp: data.otp,
    };
    try {
      const result = await verifyOtp(userInfo).unwrap();
      if (result.success) {
        toast.success("Otp verified successfully", { id: toastId });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending Otp");
    try {
      const result = await sendOtp({ email: email }).unwrap();
      if (result.success) {
        setConfirmed(true);
        setTimer(5)
        toast.success("Otp send successfully", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }
    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      console.log("Tick");
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);


  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card>
          <CardHeader>
            <CardTitle>Verify your email address</CardTitle>
            <CardDescription>
              Please enter to 6 digit we sent to
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="otp-form" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="otp"
                control={control}
                defaultValue=""
                rules={{ required: true, minLength: 6 }}
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>

                    <InputOTPSeparator className="mx-2" />

                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              <Button
                onClick={handleSendOtp}
                variant={"link"}
                type="button"
                disabled={timer !== 0}
                className={cn("p-0 m-0", {
                  "cursor-pointer": timer === 0,
                  "text-gray-500": timer !== 0,
                })}
              >
                Resend OTP : {timer}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <Button form={"otp-form"}>Submit</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Verify your email address</CardTitle>
            <CardDescription>
              We have sent you an otp to {email}
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <Button onClick={handleSendOtp} className="w-75">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Verify;
