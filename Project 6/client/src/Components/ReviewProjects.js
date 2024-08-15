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
                    <div className='bg-black absolute h-full w-full top-0 opacity-50 transition-all duration-300s'></div>
                    <div className='flex flex-col justify-between items-center absolute bottom-10 px-5 gap-3'>
                        <h1 className="uppercase text-white text-2xl font-bold text-start">Project</h1>
                        <a href="https://www.yiieldy.com/" className='text-white font-bold text-xl hover:underline'><span className="text-green-200">Yiieldy</span> - Web development</a>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="logicgraph"></div>
                    <div className='bg-black absolute h-full w-full top-0 opacity-50 transition-all duration-300s'></div>
                    <div className='flex flex-col justify-between items-center absolute bottom-10 px-5 gap-3'>
                        <h1 className="uppercase text-white text-2xl font-bold text-start">Project</h1>
                        <a href="https://logicgraph.io/" className='text-white font-bold text-xl hover:underline'><span className="text-blue-200">Logicgraph</span> - Web development</a>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="emakaamadi"></div>
                    <div className='bg-black absolute h-full w-full top-0 opacity-50 transition-all duration-300s'></div>
                    <div className='flex flex-col justify-between items-center absolute bottom-10 px-5 gap-3'>
                        <h1 className="uppercase text-white text-2xl font-bold text-start">Project</h1>
                        <a href="https://emekaamadifoundation.org/" className='text-white font-bold text-xl hover:underline'><span className="text-green-400">Emeka Amadi Foundation</span> - Web development</a>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
