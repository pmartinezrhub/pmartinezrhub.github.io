import { useEffect, useState } from 'react'
import TerminalTyper from '../lib/TerminalTyper'

const ROOT_PROMPT = { user: 'root', separator: '@', host: 'victim.org', suffix: ':~#' }

const SCRIPT = [
  { command: 'whoami', output: 'pablo' },
  { command: 'nmap -p- -sSVC --min-rate 5000 victim.org', 
    lineDelay: 400,
    output: [ 'Starting Nmap 7.98 ( https://nmap.org ) at 2026-02-09 17:35 +0100',
            'Nmap scan report for 10.129.117.151',
            'Host is up (0.044s latency)',
            'Not shown: 65533 filtered tcp ports (no-response)',
            'PORT   STATE SERVICE VERSION',
            '22/tcp open  ssh     OpenSSH 9.2p1 Debian 2+deb12u1 (protocol 2.0)',
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
  { command: 'nc -nvlc 4444 &'},
  { command: 'sudo ./exploit --target victim.org', output: '[+] root shell obtained' },
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
