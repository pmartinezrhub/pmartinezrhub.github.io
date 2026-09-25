import Layout from '../components/Layout'
import Image from 'next/image'
import profilePic from '../public/images/profile.png'
import dskull from '../public/images/3dskull-878774769.gif'
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
            window.matrix(canvasRef.current, {
              chars: ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'],
              font_size: 18,
              width: 800,
              height: 600,
              resize: false,
              exit: false,
              fps: 8,
              mount: (m) => m.start()
            })
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
           <p className="matrix-clock">Date - &#91; {timeString} &#93;</p>
            <p className="terminal-prompt">
              <span className="prompt-user">pablo</span>
              <span className="prompt-symbol">☠</span>
              <span className="prompt-host">hack</span>
              <span className="prompt-symbol">:~$</span>
              <span className="terminal-cursor">█</span>
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,255,70,0.3)',
          borderRadius: '12px',
          padding: '24px',
          color: '#0f0',
          position: 'relative'
        }}>
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{ display: 'block', width: '100%', height: '100%' }}
          />
          <Image
            src={dskull}
            className="dskull-overlay"
            width={128}
            height={128}
            alt="skull"
          />
        </div>

      </div>

    </Layout>
  )
}
