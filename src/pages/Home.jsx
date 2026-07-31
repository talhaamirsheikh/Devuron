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
import Technologies from '../components/Technologies';
import WhyChooseUs from '../components/WhyChoooseUs';
import IndustriesWeServe from '../components/IndustriesWeServe';
import PortfolioSection from '../components/PortfolioSection';
import CTASection from '../components/CTASection';
import OForm from '../components/OForm';

const Home = () => {
  return (
    <div>
      <Hero heroData={heroData} loading={false} />
      <div className='pt-10'>
        <ClientsSlider />
      </div>
      {/* <OForm /> */}
      <div className="pt-0 pb-10">
        <VerticalStackSlider />
      </div>
      
      <div className="pt-0 pb-10">
        <WhyChooseUs />
      </div>
      <div className="pt-10">
        <ProcessSection /> 
      </div>
      <div className="pt-0 pb-0">
          <PortfolioSection limit={3} initialFilter="Web Development" />
      </div>
      <div className="pt-0 pb-10">
        <IndustriesWeServe />
      </div>
      
       <div className='pt-20'>
        <Testimonials testimonialsData={{ data: testimonialsData }} loading={false} />
      </div>
      {/* <ServiceCards servicesData={{ data: services }} loading={false} /> */}
      
      {/* <Technologies /> */}
      <div className='pt-10'>
        <HomeForm />
      </div>
      <div className='pt-10'>
        <CTASection />
      </div>
     
    </div>
  );
};

export default Home;
