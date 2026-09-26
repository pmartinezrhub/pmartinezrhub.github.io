import Layout from '../components/Layout'

export default function Services() {
  return (
    <Layout>
      <div data-aos="fade-up" data-aos-duration="2500" data-aos-delay="300" className="p-6 bg-blue-500 rounded-xl text-white mb-64">
        <h2 className="text-2xl font-semibold mt-6 mb-2" style={{ marginBottom: '80px' }}>Services</h2>

        <ul className="list-disc pl-5 text-lg space-y-4">
          <li>
            🌎 Web cybersecurity audit
            <p className="text-base font-normal mt-1">
              The realization of this audit includes techniques from{' '}
              <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer">
                OWASP Top Ten
              </a>.
              Web audits include techniques and tools aimed at uncovering vulnerabilities in web applications.
              This audit is performed both from an attacker&apos;s perspective and with automated vulnerability detection tools using the OWASP methodology.
              A complete report is delivered with the actions taken, techniques, tools used, always accompanied by the corresponding logs.
            </p>
          </li>

          <li>
            📡 Wireless IoT security audit
            <p className="text-base font-normal mt-1">
              We&apos;re increasingly using IoT devices, so it&apos;s important to ensure they&apos;re not vulnerable to external attacks or information leaks.
            </p>
          </li>

          <li>
            🐧 GNU/Linux consulting
            <p className="text-base font-normal mt-1">
              Do you have a problem and don&apos;t know how to solve it? Systems integration and troubleshooting all kinds of GNU/Linux-related issues is my forte.
            </p>
          </li>

          <li>
            🔐 Password cracking
            <p className="text-base font-normal mt-1">
              Sometimes we forget passwords, and recovering them isn&apos;t always easy or even expensive.
              That&apos;s why I offer the option of cracking them as long as you have the encryption key or a file that has been encrypted with it.
              This service is paid for by computing time. Hardware used: 1 Nvidia 1050Ti GPU. 70GB dictionary plus brute force for the required time.
              Consult before doing anything.
            </p>
          </li>
        </ul>
      </div >
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Layout>
  )
}
