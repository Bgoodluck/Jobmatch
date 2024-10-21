import { fetchProfileAction } from '@/actions';
import HeroImage from '@/components/hero';
import HomePageButtonControls from '@/components/homepage-button-controls';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';








async function Home() {

  const user = await currentUser();

  console.log(user, 'currentUser')

  const profileInfo = await fetchProfileAction(user?.id);

  if(user && !profileInfo?._id) redirect('/onboard')



  return (
      <>
       {/* <div className='bg-white'>
          <div className='relative w-full'>
              <div className='min-h-screen flex'>
                  <div className='container m-auto p-0'>
                      <div className='flex items-center flex-wrap gap-12 lg:gap-0'>
                          <div className='lg:w-5/12 space-y-8'>
                              <span className='flex space-x-2'>
                                  <span className='block w-14 mb-2 border-b-2 border-gray-700'></span>
                                  <span className='font-medium text-gray-600'>
                                    Where Your Next Opportunity Finds You!
                                  </span>
                              </span>
                              <h1 className='text-4xl font-bold md:text-6xl'>
                                Connect <br/> to Careers That Fit!"
                              </h1>
                              <p className='text-xl text-gray-700'>
                              <span className='font-bold text-red-950'>
                                Jobmatch
                              </span> – Your Ultimate Job Search, Find the Best with the Best!
                              </p>
                              <HomePageButtonControls
                                        user={JSON.parse(JSON.stringify(user))}
                                        profileInfo={profileInfo}
                              />
                          </div>
                          <div className='hidden relative md:block lg:w-7/12'>
                              <img
                                src='https://shorturl.at/msw07'                           
                                alt='job portal' 
                                className='relative ml-auto'
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
       </div> */}

       <section className='relative w-full h-full min-h-screen pb-10'>
           <div className='w-full h-full relative'>
               <div className='flex flex-col-reverse lg:flex-row gap-10 mt-16'>
                  <section className='w-full lg:w-[50%] flex flex-col md:px-2 lg:px-0 p-5 lg:p-10'>
                      <div className='w-full flex justify-start flex-col h-auto lg:pt-7'>
                          <span className='flex space-x-2'>
                             <span className='block w-14 mb-2 dark:border-white border-b-2 border-gray-700'></span>
                               <span className='font-medium dark:text-white text-gray-600'>
                                  Where Your Next Opportunity Finds You!
                               </span>
                          </span>
                          <h1 className='text-3xl dark:text-white mt-5 lg:text-7xl text-black font-extrabold '>
                             Connect <br/> to Careers That Fit!
                          </h1>
                          <p className='text-xl dark:text-white text-gray-700'>
                              <span className='font-bold dark:text-red-600 text-red-950'>
                                Jobmatch
                              </span> – Your Ultimate Job Search, Find the Best with the Best!
                          </p>
                          <div className='w-full mt-6 flex items-center text-white justify-start gap-2'>
                            <HomePageButtonControls
                               user={JSON.parse(JSON.stringify(user))}
                               profileInfo={profileInfo}
                            />
                          </div>
                      </div>
                  </section>
                  <section className='relative w-full lg:w-[50%] flex items-center justify-end'>
                      {/* <img
                        src='https://utfs.io/f/4c9f7186-8ad0-4680-aece-a5abea608705-k6t10e.png'
                        alt='Hero'
                        className='w-full h-full object-contain z-10'
                      /> */}
                      <HeroImage/>
                  </section>
               </div>
           </div>
       </section>
      </>
  );
}

export default Home;



          //    <Image
          //   src={home2}
          //   alt='job portal'
          //   layout='responsive'
          //   width={700} 
          //   height={475} 
          //   className='relative ml-auto'
          // />