import Image from "next/image";
import logo from "@/assets/jobmarche.png"



function JobIcon() {
    return ( 
        <>
          <Image src={logo} width={48} height={48} alt="logo" className="rounded-full mb-4"/>
        </>
     );
}

export default JobIcon;