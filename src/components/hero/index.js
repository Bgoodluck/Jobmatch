import face1 from '@/assets/face1.jpg'
import face2 from '@/assets/face2.png'
import face3 from '@/assets/face3.jpg'
import face4 from '@/assets/face4.jpg'
import face5 from '@/assets/face5.webp'
import Image from 'next/image'

function HeroImage() {
    return ( 
        <div className="flex flex-wrap justify-center items-center gap-6 p-6 dark:bg-[#020817] bg-white">
      <div className="rounded-full bg-purple-400 w-40 h-40 overflow-hidden relative">
        <Image
          className="w-full h-full object-cover absolute"
          src={face1}
          alt="Person 1"
        />
      </div>
      <div className="rounded-full bg-orange-400 w-40 h-40 overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src={face2}
          alt="Person 2"
        />
      </div>
      <div className="rounded-full bg-blue-300 w-40 h-40 overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src={face3}
          alt="Person 3"
        />
      </div>
      <div className="rounded-full bg-yellow-300 w-40 h-40 overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src={face4}
          alt="Person 4"
        />
      </div>
      <div className="rounded-[50%] bg-red-300 w-40 h-40 overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src={face5}
          alt="Person 5"
        />
      </div>
    </div>
     );
}

export default HeroImage;