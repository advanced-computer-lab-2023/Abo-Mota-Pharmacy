import React from 'react';
import GraphicalBackground from './GraphicalBackground';
import RightHalf from './RightHalf';
import { FloatButton } from 'antd';
import { useNavigate } from 'react-router';
import { HomeOutlined } from '@ant-design/icons';

export default function GetStarted({ task }) {   
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left side with background image and graphics */}
      <div className="lg:flex-grow  relative">
        <GraphicalBackground />
      </div>
      
      {/* Right side with form and information */}
      <RightHalf task={task}/>

      <FloatButton size='large' icon={<HomeOutlined />} onClick={ () => navigate('/')} />;
    </div>
  );
}
