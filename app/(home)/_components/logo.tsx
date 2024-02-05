import Image from "next/image";

const Logo = () => {
  return <Image height={150} width={150} src={"/logo.svg"} alt={"logo"} />;
};

export default Logo;
