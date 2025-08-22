import Layout from '../components/Layout'
import Image from 'next/image'
import skullPic from '../public/images/3dskull-878774769.gif'
import socialLinkedin from '../public/social_icons/LI-In-Bug.png'
import socialGitHub from '../public/social_icons/github-mark.png'
export default function About() {
  return (
    <Layout>
      
      <h1 className="text-3xl font-bold mb-4"> About me</h1>
      
        <div data-aos="fade-up" data-aos-duration="2500" data-aos-delay="300" className="p-6 bg-blue-500 rounded-xl text-white">
        <h2>Passionated of computers, im working on IT since 20 years ago. Allways learning new things about the computer world, but the most i like is 
          GNU/Linux and cibersecurity in general. Im Spanish 🇪🇸. Have you visit my CiberWiki?</h2>
      </div>
        <div data-aos="fade-left" data-aos-duration="1500" data-aos-delay="500" className="p-6 bg-blue-500 rounded-xl text-white">
        <center><Image src={skullPic} alt="skull" width={100} height={100} className="rounded-full" /></center>
      </div>
      <div data-aos="fade-down" data-aos-duration="2500" data-aos-delay="300" className="p-6 bg-blue-500 rounded-xl text-white">
      <h2 className="text-2xl font-semibold mt-6 mb-2">Some habilities</h2>
      <ul className="list-disc pl-5 pl-5 text-lg">
        <li>💻 OS: GNU/Linux, VMWare, LXC, , Qemu, Windows Server</li>
        <li>👨‍💻 Programming: Python, Django, Bash, PowerShell, Java, PHP, HTML, CSS, Javascript, Git, SQL </li>
        <li>🔄 DevOps: Docker, Puppet, Ansible, Apache, Nginx</li>
        <li>🔐 Pentesting: Zap/Burp, Metasploit, SQLmap, WireShark, Nmap </li>
      </ul>
      </div>
      <h4>Social Links and CV</h4>
      <a href="https://www.linkedin.com/in/pablo-m-8552a790/" target="_blank"><Image src={socialLinkedin} alt="skull" width={32} height={32} className="rounded-full" /></a>
      <a href="https://github.com/pmartinezrhub/" target="_blank"><Image src={socialGitHub} alt="skull" width={32} height={32} className="rounded-full" /></a>
     
     
      <a href="mailto:admin@pmartinezr.work">
        &nbsp;&nbsp;em@il✉️&nbsp;&nbsp; 
      </a>
      <a href="/cv_pablomartinezrivas.pdf" download className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"> CV Download  </a>
        <div>

    </div>
    </Layout>
  )
}
