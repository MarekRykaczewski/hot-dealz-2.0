import { AlertCircle, Clock } from "lucide-react";

const DealStatusBanner = ({ deal }) => {
  const currentDate = new Date();
  const dealStarted = deal.startDate && currentDate >= deal.startDate;
  const dealEnded = deal.endDate && currentDate > deal.endDate;
  const dealExpired = !deal.isPublished;

  if (dealExpired || dealEnded) {
    return (
      <div className="rounded-lg flex items-center justify-center gap-2 bg-red-100 p-4 text-red-700 text-lg">
        <AlertCircle />
        <span>Unfortunately this deal has expired</span>
      </div>
    );
  } else if (dealStarted && !dealEnded) {
    return (
      <div className="rounded-lg flex items-center justify-center gap-2 bg-green-100 p-4 text-green-700 text-lg">
        <span>Deal expires on {deal.endDate.toDateString()}</span>
      </div>
    );
  } else if (deal.startDate) {
    return (
      <div className="rounded-lg flex items-center justify-center gap-2 bg-orange-100 p-4 text-orange-700 text-lg">
        <Clock /> Deal Starts <b>{deal.startDate.toDateString()}</b>
      </div>
    );
  } else {
    return null;
  }
};

export default DealStatusBanner;
