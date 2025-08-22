import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="p-4">
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Links */}
        <div className="flex gap-6">
          <Link href="https://pmartinezr.work" className="hover:text-yellow-400 transition-colors"> Home&nbsp;&nbsp;  </Link>
          <Link href="/about" className="hover:text-yellow-400 transition-colors"> About&nbsp;&nbsp;  </Link>
          <Link href="/services" className="hover:text-yellow-400 transition-colors"> Services&nbsp;&nbsp;  </Link>
          <Link href="https://wiki.pmartinezr.work" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
            CiberWiki
          </Link>
        </div>
      </div>
    </nav>
      <hr></hr>
    </header>
  )
}
