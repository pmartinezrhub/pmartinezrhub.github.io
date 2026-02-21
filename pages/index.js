import Layout from '../components/Layout'
import Image from 'next/image'
import profilePic from '../public/images/profile.png'
import { useEffect, useState, useRef } from 'react'
import Script from 'next/script'
import AOS from 'aos'

export default function Home() {
  const [timeString, setTimeString] = useState('')
  const canvasRef = useRef(null)

  useEffect(() => {
    AOS.init({ once: true })

    function updateTime() {
      const currentTime = new Date()

      const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

      const dayOfWeek = daysOfWeek[currentTime.getDay()]
      const month = months[currentTime.getMonth()]
      const dayOfMonth = currentTime.getDate()
      const hours = currentTime.getHours()
      const minutes = currentTime.getMinutes()
      const seconds = currentTime.getSeconds()

      setTimeString(
        `${dayOfWeek}, ${month} ${dayOfMonth}, ${hours
          .toString()
          .padStart(2,'0')}:${minutes
          .toString()
          .padStart(2,'0')}:${seconds
          .toString()
          .padStart(2,'0')}`
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>

      <div style={{ height: '10vh' }}></div>
      <Script
        src="https://cdn.jsdelivr.net/npm/cmatrix"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.matrix && canvasRef.current) {
            let matrixInstance;

            window.matrix(canvasRef.current, {
              chars: ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'],
              color: 'black',
              font_size: 18,
              background: 'rgba(255,255,255,0.1)',
              width: 800,
              height: 600,
              resize: false,
              exit: false,
              fps: 8,
              mount: (m) => { 
                matrixInstance = m; 
                matrixInstance.start(); // iniciar cuando se monta
              }
            });

            // ejemplo: pausas automáticas
            setInterval(() => {
              if (matrixInstance) {
                matrixInstance.stop();
                setTimeout(() => matrixInstance.start(), 400);
              }
            }, 200);
          }
        }}
      />
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <div className="p-6 bg-blue-500 rounded-xl text-white">
                <div className="p-6 bg-blue-500 rounded-xl text-white mt-6">


        <h1 className="flex items-center gap-2">
          <Image
            src={profilePic}
            alt="profile"
            width={32}
            height={32}
            className="rounded-full"
          />
          &nbsp;&nbsp;Welcome, I'm Pablo Martínez Rivas
        </h1>
      </div>
           <p>Date - &#91; {timeString} &#93;</p>
        </div>
      </div>
      <div
        style={{
          width: '800px',
          height: '600px',
          overflow: 'hidden',
          borderRadius: '12px',
          background: 'white'
        }}
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          style={{ display: 'block' }}
        />
      </div>
    </div>




    </Layout>
  )
}