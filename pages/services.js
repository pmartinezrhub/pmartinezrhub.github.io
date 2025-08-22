import Layout from '../components/Layout'

export default function Services() {
  return (
    <Layout>
      <div data-aos="fade-up" data-aos-duration="2500" data-aos-delay="300" className="p-6 bg-blue-500 rounded-xl text-white">
      <h2 className="text-2xl font-semibold mt-6 mb-2">Servicies</h2>
      
       <ul className="list-disc pl-5 text-lg">
        <li>🌎 Web cybersecurity audit </li>
        The realization of this audition includes techniques for <a href="https://owasp.org/www-project-top-ten/"> https://owasp.org/www-project-top-ten </a>
        Web audits include techniques and tools aimed at uncovering vulnerabilities in web applications.
        This audit is performed both from an attacker's perspective and with automated vulnerability detection tools using the OWASP methodology.
        A complete report is delivered with the actions taken, techniques, tools used, always accompanied by the corresponding logs.
        <li>📡 Wireless IoT security audit </li>
        We're increasingly using IoT devices, so it's important to ensure they're not vulnerable to external attacks or information leaks.
        <li>🐧 GNU/Linux consulting</li>
        Do you have a problem and don't know how to solve it? Systems integration and troubleshooting all kinds of GNU/Linux-related issues is my forte.
        <li>🔐 Password cracking </li>
        Sometimes we forget passwords, and recovering them isn't always easy or even expensive.
        That's why I offer the option of cracking them as long as you have the encryption key or a file that has been encrypted with it.
        This service is paid for by computing time. Hardware used: 1 Nvidia 1050Ti GPU. 70GB dictionary plus brute force for the required time.
        Consult before doing anything.
         </ul>
     </div> 
    </Layout>
  )
}
