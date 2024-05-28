import Image from "next/image";

export const Logo = () => {
  return (
   <Image 
   height={130}
   width={130}
   alt="logo"
   src="/logo.svg"
/ >
  );
};

 {/**es un componente de imagen lo importante es entender como hace next con la s imagenes  */}