import { Deal } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const DealCard = ({ deal }: { deal: Deal }) => {
  const {
    title,
    link,
    description,
    promoCode,
    startDate,
    endDate,
    price,
    nextBestPrice,
    shippingPrice,
  } = deal;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <p>Price: ${price}</p>
        <p>Next Best Price: ${nextBestPrice}</p>
        <p>Start Date: {startDate?.toDateString()}</p>
        <p>End Date: {endDate?.toDateString()}</p>
        {promoCode && <p>Promo Code: {promoCode}</p>}
        {shippingPrice && <p>Shipping Price: ${shippingPrice}</p>}
      </CardContent>
      <CardFooter>
        <a href={link} target="_blank" rel="noopener noreferrer">
          View Deal
        </a>
      </CardFooter>
    </Card>
  );
};

export default DealCard;
