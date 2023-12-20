import {useRef} from "react";
import Header from "./Header";
import Testimonials from "./Testimonials";
import Services from "./Services";
import About from "./About";
import Footer from "../../components/Footer";


const LandingPage = () => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const footerRef = useRef(null);

  // Function to scroll to a ref
  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='landing-page'>
      <Header
        onAboutClick={() => scrollToRef(aboutRef)}
        onServicesClick={() => scrollToRef(servicesRef)}
        onTestimonialsClick={() => scrollToRef(testimonialsRef)}
        onFooterClick={() => scrollToRef(footerRef)}
      />
      <div ref={aboutRef}><About /></div>
      <div ref={servicesRef}><Services /></div>
      <div ref={testimonialsRef}><Testimonials /></div>
      {/* Uncomment other sections as needed */}
      {/* <div ref={blogsRef}><Blogs /></div>
      <div ref={contactRef}><Contact /></div> */}
      <div ref={footerRef}><Footer /></div>
    </div>
  );
};

export default LandingPage;
