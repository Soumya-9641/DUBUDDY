import React from 'react'
import styles from '../style'
import assets from '../assests';
import Polite from "./Polite.json"
import Computer from "./comp.json"
import Lottie from 'lottie-react'
 const footerLinks = [
    {
      id:"1",
      title: "Useful Links",
      links: [
        {
          id:"11",
          name: "Content",
          link: "https://www.hoobank.com/content/",
        },
        {
          id:"22",
          name: "How it Works",
          link: "https://www.hoobank.com/how-it-works/",
        },
        {
          id:"33",
          name: "Create",
          link: "https://www.hoobank.com/create/",
        },
        {
          id:"44",
          name: "Explore",
          link: "https://www.hoobank.com/explore/",
        },
        {
          id:"55",
          name: "Terms & Services",
          link: "https://www.hoobank.com/terms-and-services/",
        },
      ],
    },
    {
      id:"2",
      title: "Community",
      links: [
        {
          name: "Help Center",
          link: "https://www.hoobank.com/help-center/",
        },
        {
          name: "Partners",
          link: "https://www.hoobank.com/partners/",
        },
        {
          name: "Suggestions",
          link: "https://www.hoobank.com/suggestions/",
        },
        {
          name: "Blog",
          link: "https://www.hoobank.com/blog/",
        },
        {
          name: "Newsletters",
          link: "https://www.hoobank.com/newsletters/",
        },
      ],
    },
    {
      id:"3",
      title: "Partner",
      links: [
        {
          name: "Our Partner",
          link: "https://www.hoobank.com/our-partner/",
        },
        {
          name: "Become a Partner",
          link: "https://www.hoobank.com/become-a-partner/",
        },
      ],
    },
  ];
  
const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
        <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
              <div className='flex-1  flex flex-col justify-start mr-10'>
                
              
                <Lottie animationData={Computer} width={100} resizeMode="cover"/>
              </div>
              <div className='flex-[1.5] pt-10 w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10'>
                    {footerLinks.map((footerlink)=>(
                        <div key={footerlink.id} className='flex flex-col ss:my-0 my-4 min-w-[150px]'>
                              <h4 className='font-poppins font-medium text-[18px] leading-[27px] text-white'>
                                {footerlink.title}
                              </h4>
                              <ul className='list-none mt-4'>
                                {footerlink.links.map((link,index)=>(
                                  <li key={link.id} className={`font-poppins font-normal text-dimWhite leading-[24px] text-[15px] hover:text-secondary cursor-pointer ${index!== footerlink.links.length -1 ? 'mb-4':'mb-0'}`}>
                                    {link.name}
                                  </li>
                                ))}
                              </ul>
                        </div>
                    ))}
              </div>
        </div>  
        <div className='w-full flex justify-between items-center md:flex-row flex-col pt-6 pl-4 border-t-[1px] border-t-[#70b3ad]'>
          <p className='font-poppins font-normal text-center text-[14px] leading-[27px] text-white'>
            ©2023 EazyBlog. All Rights Reserved.
          </p>
          
          <p className='font-poppins font-normal text-center text-[14px] leading-[27px] text-white mr-10'>
            code with love ❤️ by Soumyadip_Gantait
          </p>
          
          
        
        </div>
  </section>
)

export default Footer