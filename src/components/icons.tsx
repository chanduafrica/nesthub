import type { SVGProps } from "react";
import Image from "next/image";

export const NestIcon = (props: SVGProps<SVGSVGElement> & {width?: number; height?: number}) => (
    <Image 
      src="/images/dnlogo.png" 
      alt="DigitalNest Logo" 
      width={props.width || 24} 
      height={props.height || 24} 
      className={props.className}
    />
  );
