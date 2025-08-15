import Layout from '../components/Layout'
import Image from 'next/image'
import profilePic from '../public/images/profile.png'
import { useEffect, useState } from 'react';
import AOS from 'aos';

export default function Home() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    AOS.init({ once: true });

    function updateTime() {
      const currentTime = new Date();

      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      const dayOfWeek = daysOfWeek[currentTime.getDay()];
      const month = months[currentTime.getMonth()];
      const dayOfMonth = currentTime.getDate();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();

      setTimeString(
        `${dayOfWeek}, ${month} ${dayOfMonth}, ${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }

    updateTime(); // mostrar inmediatamente
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // limpiar al desmontar
  }, []);

  return (
    <Layout>
      <br />
      <div style={{ height: '10vh' }}></div>

      <div
        data-aos="fade-down"
        data-aos-duration="2500"
        data-aos-delay="300"
        className="p-6 bg-blue-500 rounded-xl text-white"
      >
        <h4><p className="text-xl">Date - &#91; {timeString} &#93;</p></h4>
        <h1 className="flex items-center gap-2">
          <Image src={profilePic} alt="profile" width={32} height={32} className="rounded-full" />
          Welcome, I'm Pablo Martínez Rivas
        </h1>
      </div>

      <div
        data-aos="fade-right"
        data-aos-duration="2500"
        data-aos-delay="300"
        className="p-6 bg-blue-500 rounded-xl text-white mt-4"
      >
        <h2>Linux system administrator, pentester and developer</h2>
       
      </div>

      {/* Bloque de fecha/hora */}
      <div
        data-aos="fade-up"
        data-aos-duration="2500"
        data-aos-delay="300"
        className="p-6 bg-gray-800 rounded-xl text-white mt-4 text-center"
      >
       
      </div>
    </Layout>
  );
}
