import React from 'react';
import Image1 from '../../../assets/Lundev/Slider3D/dragon_1.jpg'
import Image2 from '../../../assets/Lundev/Slider3D/dragon_2.jpg'
import Image3 from '../../../assets/Lundev/Slider3D/dragon_3.jpg'
import Image4 from '../../../assets/Lundev/Slider3D/dragon_4.jpg'
import Image5 from '../../../assets/Lundev/Slider3D/dragon_5.jpg'
import Image6 from '../../../assets/Lundev/Slider3D/dragon_6.jpg'
import Image7 from '../../../assets/Lundev/Slider3D/dragon_7.jpg'
import Image8 from '../../../assets/Lundev/Slider3D/dragon_8.jpg'
import Image9 from '../../../assets/Lundev/Slider3D/dragon_9.jpg'
import Image10 from '../../../assets/Lundev/Slider3D/dragon_10.jpg'
import '../../../css/slider3d.css';
function Lundev() {
  return (
    <div className="w-full h-screen text-center overflow-hidden relative banner">
        <div className="absolute w-[200px] h-[250px] top-[10%] left-[calc(50%-100px)] preserve-3d perspective-1000 animate-autoRun z-[2]" style={{'--quantity': '10'}}>
            <div className="absolute inset-0 custom-transform" style={{'--position': '1'}}><img src={Image1} alt="" className="object-cover w-full h-full"/></div>
            <div className="absolute inset-0 custom-transform" style={{'--position': "2"}}><img src={Image2} alt="" className="object-cover w-full h-full"/></div>
            <div className="absolute inset-0 custom-transform" style={{'--position': "3"}}><img src={Image3} alt="" className="object-cover w-full h-full"/></div>
            <div className="absolute inset-0 custom-transform" style={{'--position': "4"}}><img src={Image4} alt="" className="object-cover w-full h-full"/></div>
            <div className="absolute inset-0 custom-transform" style={{'--position': "5"}}><img src={Image5} alt="" className="object-cover w-full h-full"/></div>
            <div className="absolute inset-0 custom-transform" style={{'--position': "6"}}><img src={Image6} alt="" className="object-cover w-full h-full"/></div>
            <div className="absolute inset-0 custom-transform" style={{'--position': "7"}}><img src={Image7} alt="" className="object-cover w-full h-full"/></div>
            <div className="absolute inset-0 custom-transform" style={{'--position': "8"}}><img src={Image8} alt="" className="object-cover w-full h-full"/></div>
            <div className="absolute inset-0 custom-transform" style={{'--position': "9"}}><img src={Image9} alt="" className="object-cover w-full h-full"/></div>
            <div className="absolute inset-0 custom-transform" style={{'--position': "10"}}><img src={Image10} alt="" className="object-cover w-full h-full"/></div>
        </div>
        <div className="content">
            <h1 data-content="ADIL HUQ">
                ADIL HUQ
            </h1>
            <div className="author">
                <h2>DESIGNER</h2>
                <p><b>Web Design</b></p>
                <p>
                    Web design work with love
                </p>
            </div>
            <div className="model"></div>
        </div>
    </div>
  );
}

export default Lundev;
