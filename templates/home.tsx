import React, {FC} from 'react';
import SimulateBox from '@/organisms/SimulateBox';
import DartShot from '@/libs/DartShot';

const shot = new DartShot()
shot.execSimulate()

const Home: FC = () => {
  return (
    <div className="w-screen h-screen">
      <SimulateBox/>
    </div>
  )
};

export default Home;
