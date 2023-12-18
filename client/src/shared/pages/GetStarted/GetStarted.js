import React from 'react';
import GraphicalBackground from './GraphicalBackground';
import RightHalf from './RightHalf';
import { FloatButton } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

export default function GetStarted({ task }) {   
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left side with background image and graphics */}
      <div className="lg:flex-grow  relative">
        <GraphicalBackground />
      </div>
      
      {/* Right side with form and information */}
      <RightHalf task={task} />

      <FloatButton style={{
      position: 'fixed', // Use fixed to position the button
      top: '16px', // Distance from the top of the viewport
      left: '16px', // Distance from the left of the viewport
  }}  icon={<HomeOutlined/>} onClick={()=>(navigate('/'))} />
    </div>
  );
}
