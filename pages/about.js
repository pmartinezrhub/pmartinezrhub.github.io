import Layout from '../components/Layout'
import Image from 'next/image'
import socialLinkedin from '../public/social_icons/LI-In-Bug.png'
import socialGitHub from '../public/social_icons/github-mark.png'
import socialCredly from '../public/social_icons/credly.svg'
import cyberProfile from '../public/social_icons/cyberprofile.png'
import StackIcon from "tech-stack-icons"

export default function About() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">About me</h1>

      <div data-aos="fade-up" data-aos-duration="2500" data-aos-delay="300" className="p-6 bg-blue-500 rounded-xl text-white">
        <h2>Passionate about computers, I&apos;ve been working in IT for 20 years. I&apos;m always learning new things about the technological world, and I enjoy cybersecurity. I&apos;m from Spain 🇪🇸. Have you visit my CiberWiki?</h2>
      </div>

      <div data-aos="fade-down" data-aos-duration="2500" data-aos-delay="300" className="p-6 bg-blue-500 rounded-xl text-white mt-6">
        <h2 className="text-2xl font-semibold mt-6 mb-2">Some habilities</h2>
        <ul className="list-disc pl-5 text-lg">
          <li>💻 OS: GNU/Linux, VMWare, LXC, Qemu, Windows Server</li>
          <li>👨‍💻 Programming: Python, Django, Bash, PowerShell, Java, PHP, HTML, CSS, Javascript, Git, SQL</li>
          <li>🔄 DevOps: Docker, Puppet, Ansible, Apache, Nginx</li>
          <li>🔐 Pentesting: Zap/Burp, Metasploit, SQLmap, WireShark, Nmap</li>
        </ul>
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "24px", flexWrap: "wrap" }}>
        <div style={{ width: 40, height: 40 }}><StackIcon name="linux" /></div>
        <div style={{ width: 40, height: 40 }}><StackIcon name="django" /></div>
        <div style={{ width: 40, height: 40 }}><StackIcon name="python" /></div>
        <div style={{ width: 40, height: 40 }}><StackIcon name="docker" /></div>
        <div style={{ width: 40, height: 40 }}><StackIcon name="bash" /></div>
        <div style={{ width: 40, height: 40 }}><StackIcon name="powershell" /></div>
        <div style={{ width: 40, height: 40 }}><StackIcon name="android" /></div>
        <div style={{ width: 40, height: 40 }}><StackIcon name="mysql" /></div>
        <div style={{ width: 40, height: 40 }}><StackIcon name="apache" /></div>
        <div style={{ width: 40, height: 40 }}><StackIcon name="cloudflare" /></div>
        <div style={{ width: 40, height: 40 }}><StackIcon name="java" /></div>
        <div style={{ width: 40, height: 40 }}><StackIcon name="php" /></div>
      </div>

      <hr />

      <h4>Social Links and CV</h4>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "96px" }}>
        <a href="https://www.credly.com/users/pablo-martinez-rivas/badges#credly" target="_blank" rel="noopener noreferrer">
          <Image src={socialCredly} alt="Credly" width={32} height={32} className="rounded-full" />
        </a>
        <a href="https://www.linkedin.com/in/pmartinezrivas/" target="_blank" rel="noopener noreferrer">
          <Image src={socialLinkedin} alt="LinkedIn" width={32} height={32} className="rounded-full" />
        </a>
        <a href="https://github.com/pmartinezrhub/" target="_blank" rel="noopener noreferrer">
          <Image src={socialGitHub} alt="GitHub" width={32} height={32} className="rounded-full" />
        </a>
        <a href="https://cyber-profile.com/u/pmartinezrhck" target="_blank" rel="noopener noreferrer">
          <Image src={cyberProfile} alt="CyberProfile" width={64} height={32} className="rounded-full" />
        </a>
        <a href="mailto:admin@pmartinezr.work">em@il✉️</a>
      </div>
    </Layout>
  )
}