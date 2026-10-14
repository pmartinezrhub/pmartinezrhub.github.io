import Head from 'next/head'
import Layout from '../components/Layout'
import TerminalPrompt from '../components/TerminalPrompt'
import Image from 'next/image'
import profilePic from '../public/images/profile.png'
import dskull from '../public/images/3dskull-878774769.gif'
import { useEffect, useRef, useState } from 'react'
import AOS from 'aos'
import MatrixLibraryLoader from '../lib/MatrixLibraryLoader'
import MatrixController from '../lib/MatrixController'

const ROLES = ['Pentester', 'Developer', 'Security Researcher']
const ROLES_LABEL = new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' }).format(ROLES)

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
        const { width, height } = canvasContainerRef.current.getBoundingClientRect()
        const canvasWidth = Math.round(width)
        const canvasHeight = Math.round(height)
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        canvas.style.cssText = 'position:absolute;top:0;left:0;display:block;width:100%;height:100%;z-index:1;'
        canvasContainerRef.current.innerHTML = ''
        canvasContainerRef.current.appendChild(canvas)

        MatrixLibraryLoader.load()
          .then(() => {
            if (!cancelled) {
              controllerRef.current.start(canvas, {
                chars: ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'],
                font_size: 18,
                width: canvasWidth,
                height: canvasHeight,
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
      <Head>
        <title>Pablo Martínez Rivas | Pentester & Security Researcher</title>
        <meta name="description" content="Portafolio de Pablo Martínez Rivas, pentester, desarrollador e investigador de seguridad especializada en pruebas de penetración." />
        <meta name="keywords" content="pentester, security, ciberseguridad, hacking ético, desarrollo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ height: '10vh' }}></div>

      <div className="home-layout">
        <div className="home-intro">
          <div className="p-6 bg-blue-500 rounded-xl text-white">
            <div className="p-6 bg-blue-500 rounded-xl text-white mt-6">
              <p className="text-sm opacity-80">Welcome, I'm</p>
              <h1 className="text-2xl font-bold mt-1">Pablo Martínez Rivas</h1>
              <p className="text-sm mt-2">{ROLES_LABEL}</p>
            </div>
            <p className="matrix-clock">Date &#91; {timeString} &#93;</p>
          </div>

          <div className="profile-avatar">
            <Image
              src={profilePic}
              alt="profile"
              width={160}
              height={160}
            />
          </div>
        </div>

        <div className="matrix-panel">
          <div className="matrix-skull">
            <Image
              src={dskull}
              alt="3D skull"
              width={128}
              height={128}
            />
          </div>

          <div ref={canvasContainerRef} className="matrix-canvas-layer" />

          <div className="matrix-terminal">
            <TerminalPrompt />
          </div>
        </div>
      </div>
    </Layout>
  )
}
