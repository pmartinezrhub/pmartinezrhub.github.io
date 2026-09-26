export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center p-4 mt-auto style={{ marginTop: '20px' }}">
      <p>
        {new Date().getFullYear()}{' '}
        <a
          href="https://github.com/pmartinezrhub/pmartinezrhub.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Portfolio site
        </a>
      </p>
    </footer>
  )
}
