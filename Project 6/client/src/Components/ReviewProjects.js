import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import './styles.css'

export default function ReviewProjects() {
    return (
        <>
            <Swiper
                className="mySwiper"
                modules={[Autoplay]}
                autoplay={{ delay: 20000 }}
                loop={true}
            >
                <SwiperSlide>
                    <div className="yiieldy"></div>
                    <div className='bg-black absolute lg:h-full lg:w-full md:h-auto md:w-full h-[400px] w-full top-0 opacity-50 transition-all duration-300s'></div>
                    <div className='flex flex-col justify-between items-center absolute bottom-10 px-5 gap-3'>
                        <h1 className="uppercase text-white lg:text-2xl md:text-xl text-md font-bold text-start lg:block md:block hidden">Project</h1>
                        <a href="https://www.yiieldy.com/" className='text-white font-bold lg:text-xl md:text-md text-sm hover:underline'><span className="text-green-200">Yiieldy</span> - Web development</a>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="logicgraph"></div>
                    <div className='bg-black absolute lg:h-full lg:w-full md:h-auto md:w-auto h-[400px] w-full top-0 opacity-50 transition-all duration-300s'></div>
                    <div className='flex flex-col justify-between items-center absolute bottom-10 px-5 gap-3'>
                        <h1 className="uppercase text-white lg:text-2xl md:text-xl text-md font-bold text-start lg:block md:block hidden">Project</h1>
                        <a href="https://logicgraph.io/" className='text-white font-bold lg:text-xl md:text-md text-sm hover:underline'><span className="text-blue-200">Logicgraph</span> - Web development</a>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="emakaamadi"></div>
                    <div className='bg-black absolute lg:h-full lg:w-full md:h-auto md:w-auto h-[400px] w-full top-0 opacity-50 transition-all duration-300s'></div>
                    <div className='flex flex-col justify-between items-center absolute bottom-10 px-5 gap-3'>
                        <h1 className="uppercase text-white lg:text-2xl md:text-xl text-md font-bold text-start lg:block md:block hidden">Project</h1>
                        <a href="https://emekaamadifoundation.org/" className='text-white font-bold lg:text-xl md:text-md text-sm hover:underline'><span className="text-green-400">Emeka Amadi Foundation</span> - Web development</a>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
