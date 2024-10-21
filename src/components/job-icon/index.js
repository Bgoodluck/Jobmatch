import Image from "next/image";
import jobmarche from "@/assets/images/jobmarche.png";



function JobIcon() {
    return ( 
        <>
          <Image src={jobmarche} width={48} height={48} alt="logo" className="rounded-full mb-4"/>
        </>
     );
}

export default JobIcon;