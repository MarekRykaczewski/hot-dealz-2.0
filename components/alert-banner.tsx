import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const AlertBanner = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <Alert className=" bg-yellow-50 text-yellow-800 hover:cursor-pointer">
      <AlertTriangle className="h-4 w-4" color="#854d0e" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AlertBanner;
