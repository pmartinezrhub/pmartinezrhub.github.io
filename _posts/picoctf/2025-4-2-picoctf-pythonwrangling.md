---
title: Python Wrangling
date: 2025-04-1 12:00:00 +0200
categories: [writeup, picoctf]
tags: [picoctf, ingeniería reversa, python]     
image:
    path: https://picoctf.org/img/logos/pico-mark.svg
    alt: PicoCTF
---

>Python Wrangling
Author: syreal
Description
Python scripts are invoked kind of like programs in the Terminal... Can you run this Python script using this password to get the flag?
{: .prompt-tip }

Este requiere que te descargues un script en Python una password y supongo que ejecutando el script con la password obtienes la flag.
Analizemos el contenido del script:

``` python

import sys
import base64
from cryptography.fernet import Fernet

usage_msg = "Usage: "+ sys.argv[0] +" (-e/-d) [file]"
help_msg = usage_msg + "\n" +\
        "Examples:\n" +\
        "  To decrypt a file named 'pole.txt', do: " +\
        "'$ python "+ sys.argv[0] +" -d pole.txt'\n"

if len(sys.argv) < 2 or len(sys.argv) > 4:
    print(usage_msg)
    sys.exit(1)

if sys.argv[1] == "-e":
    if len(sys.argv) < 4:
        sim_sala_bim = input("Please enter the password:")
    else:
        sim_sala_bim = sys.argv[3]

    ssb_b64 = base64.b64encode(sim_sala_bim.encode())
    c = Fernet(ssb_b64)

    with open(sys.argv[2], "rb") as f:
        data = f.read()
        data_c = c.encrypt(data)
        sys.stdout.write(data_c.decode())

elif sys.argv[1] == "-d":
    if len(sys.argv) < 4:
        sim_sala_bim = input("Please enter the password:")
    else:
        sim_sala_bim = sys.argv[3]

    ssb_b64 = base64.b64encode(sim_sala_bim.encode())
    c = Fernet(ssb_b64)

    with open(sys.argv[2], "r") as f:
        data = f.read()
        data_c = c.decrypt(data.encode())
        sys.stdout.buffer.write(data_c)

elif sys.argv[1] == "-h" or sys.argv[1] == "--help":
    print(help_msg)
    sys.exit(1)

else:
    print("Unrecognized first argument: "+ sys.argv[1])
    print("Please use '-e', '-d', or '-h'.")

```

No supuso un reto entender este script y ejecutarlo de las dos maneras posibles que parece ofrecer

``` shell
pablo☠office Python_Wrangling$ python ende.py -d flag.txt.en pablo☠office Python_Wrangling$ python ende.py -d flag.txt.en 
Please enter the password:aa821c16aa821c16aa821c16aa821c16
picoCTF{4p0110_1n_7h3_h0us3_aa821c16}

pablo☠office Python_Wrangling$ python ende.py -d flag.txt.en aa821c16aa821c16aa821c16aa821c16
picoCTF{4p0110_1n_7h3_h0us3_aa821c16}

```
He codificado una versión reducida del script: 
``` python
import base64
from cryptography.fernet import Fernet

sim_sala_bim = "aa821c16aa821c16aa821c16aa821c16"
ssb_b64 = base64.b64encode(sim_sala_bim.encode())
c = Fernet(ssb_b64)

with open("flag.txt.en", "r") as f:
        data = f.read()
        data_c = c.decrypt(data.encode())
        print(f"{data_c}")

```
``` shell
pablo☠office Python_Wrangling$ python test.py     
b'picoCTF{4p0110_1n_7h3_h0us3_aa821c16}\n'
```

flag: **picoCTF{4p0110_1n_7h3_h0us3_aa821c16}**