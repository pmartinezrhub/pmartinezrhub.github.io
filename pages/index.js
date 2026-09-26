import Layout from '../components/Layout'
import Image from 'next/image'
import profilePic from '../public/images/profile.png'
import dskull from '../public/images/3dskull-878774769.gif'
import { useEffect, useRef, useState } from 'react'
import AOS from 'aos'
import MatrixLibraryLoader from '../lib/MatrixLibraryLoader'
import MatrixController from '../lib/MatrixController'

export default function Home() {
  const [timeString, setTimeString] = useState('')
  const canvasContainerRef = useRef(null)
  const controllerRef = useRef(null)

  useEffect(() => {
    AOS.init({ once: true })

    let cancelled = false

    controllerRef.current = new MatrixController()

    const updateTime = () => {
      const currentTime = new Date()
      const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

      const dayOfWeek = daysOfWeek[currentTime.getDay()]
      const month = months[currentTime.getMonth()]
      const dayOfMonth = currentTime.getDate()
      const hours = currentTime.getHours()
      const minutes = currentTime.getMinutes()
      const seconds = currentTime.getSeconds()

      if (!cancelled) {
        setTimeString(
          `${dayOfWeek}, ${month} ${dayOfMonth}, ${hours
            .toString()
            .padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`
        )
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    setTimeout(() => {
      if (!cancelled && canvasContainerRef.current) {
        const canvas = document.createElement('canvas')
        canvas.id = 'matrix-canvas'
        canvas.width = 800
        canvas.height = 600
        canvas.style.cssText = 'position:absolute;top:0;left:0;display:block;width:100%;height:100%;z-index:1;'
        canvasContainerRef.current.innerHTML = ''
        canvasContainerRef.current.appendChild(canvas)

        MatrixLibraryLoader.load()
          .then(() => {
            if (!cancelled) {
              controllerRef.current.start(canvas, {
                chars: ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'],
                font_size: 18,
                width: 800,
                height: 600,
                resize: false,
                exit: false
              })
            }
          })
          .catch((error) => console.error('Error cargando cmatrix:', error))
      }
    }, 0)

    return () => {
      cancelled = true
      clearInterval(interval)
      
      if (controllerRef.current) {
        controllerRef.current.stop()
        controllerRef.current.instance = null
      }
      
      if (canvasContainerRef.current) {
        canvasContainerRef.current.innerHTML = ''
      }
      
      if (window.matrixInstance) {
        delete window.matrixInstance
      }
    }
  }, [])

  return (
    <Layout>
      <div style={{ height: '10vh' }}></div>

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

        <div 
          style={{
            position: 'relative',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0,255,70,0.3)',
            borderRadius: '12px',
            padding: '24px',
            color: '#0f0',
            width: '800px',
            minHeight: '600px',
            overflow: 'visible'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 10,
            pointerEvents: 'none'
          }}>
            <Image
              src={dskull}
              alt="3D skull"
              width={128}
              height={128}
              style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,70,0.5))' }}
            />
          </div>

          <div 
            ref={canvasContainerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1
            }}
          />
        </div>
      </div>
    </Layout>
  )
}