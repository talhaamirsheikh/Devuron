import React from 'react';
import Hero from '../components/Hero';
import VerticalStackSlider from '../components/VerticalStackSlider';
import ProcessSection from '../components/ProcessSection';
import ClientsSlider from '../components/ClientsSlider';
import HomeForm from '../components/HomeForm';
import ServiceCards from '../components/ServiceCards';
import Testimonials from '../components/Testimonials';

import { heroData, testimonialsData } from '../constants/homeData';
import { services } from '../constants/services';

const Home = () => {
  return (
    <div>
      <Hero heroData={heroData} loading={false} />
      <div className="pt-20">
        <VerticalStackSlider />
      </div>
      <div className="pt-10">
        <ProcessSection /> 
      </div>
      {/* <ServiceCards servicesData={{ data: services }} loading={false} /> */}
      <div className='pt-10'>
        <ClientsSlider />
      </div>
      <div className='pt-10'>
        <HomeForm />
      </div>
      <div className='pt-20'>
        <Testimonials testimonialsData={{ data: testimonialsData }} loading={false} />
      </div>
    </div>
  );
};

export default Home;
