import React from 'react'
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const images = [
    'https://www.bellavisage.co.za/wp-content/uploads/2021/06/Blog-Web-Header-Background-1.jpg',
    'https://settingmyintention.com/wp-content/uploads/2016/02/5-Reasons-I-blog-Horizontal.jpg',
    'https://thedevotionalguy.files.wordpress.com/2020/04/top-view-photo-of-computer-laptop-on-white-table-3773406-2-tdg.jpg?w=1568',
    'https://idyourself.com/wp-content/uploads/id-yourself-blog-page-header.jpg',
    'https://media.istockphoto.com/id/1133586715/photo/laptop-on-wooden-table-showing-charts-and-graph-against-blur-cityscape-with-tower-background.jpg?s=612x612&w=0&k=20&c=f2zo2EhK2ThjpVXwSqKMMPFsCn9efjk6OfyfBlrVShQ=',
    'https://t3.ftcdn.net/jpg/02/21/79/40/360_F_221794075_LsuBECheGGj3zaCwC8o5OmRHbwVSaLBm.jpg'
  ];

const Slideshow = () => {
  return (
    <div className="slide-container">
        <Zoom scale={0.4}>
          {
            images.map((each, index) => <img alt='' key={index} style={{width: "100%"}} src={each} />)
          }
        </Zoom>
      </div>
  )
}

export default Slideshow



// 'https://d2g9wbak88g7ch.cloudfront.net/bannerimages/83_inr.jpg',
// 'https://d2g9wbak88g7ch.cloudfront.net/bannerimages/84_inr.jpg',
// 'https://d2g9wbak88g7ch.cloudfront.net/bannerimages/81_inr.jpg',
// 'https://d2g9wbak88g7ch.cloudfront.net/bannerimages/80_inr.jpg',
// 'https://d2g9wbak88g7ch.cloudfront.net/bannerimages/78_inr.jpg'