# <img src="https://github.com/itsflameee/shararam-linux/blob/main/shararam.png?raw=true" width="25" height="25" title="shararam-linux"/> shararam-linux

**shararam-linux** - порт оригинального Шарарама на Linux. Порт основан на [Electron 7.3.3](https://github.com/electron/electron/releases/tag/v7.3.3) и [Clean Flash](https://github.com/darktohka/clean-flash-builds/releases/tag/v1.7).

## Как это работает?
Оригинальная "иконка Шарарама" на Windows (и скорее всего, на macOS) работает по принципу установки кастомного User-Agent (Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Shararam/2.0.6 Chrome/80.0.3987.163 Electron/8.5.5 Safari/537.36),
а также посещения сайта шарарама (https://www.shararam.ru/game). Если посетить этот сайт из обычного браузера (даже если он поддерживает Flash Player) - шарарам нас любезно перенаправит на новую, урезанную Unity-версию (https://www.shararam.ru/newgame).

Вы можете попробовать любым удобным вам способом подменить свой User-Agent в обычном браузере на тот, что был указан выше, и игра вам выдаст флеш версию игры (если Adobe Flash Player в вашем браузере отсутствует, а это буквально все современные браузеры - вы получите ошибку об отсутствии Flash Player,
но вас не перенаправит на https://www.shararam.ru/newgame).

По такому же принципу работает и наш порт. В [main.js](https://github.com/itsflameee/shararam-linux/blob/main/main.js) вы можете увидеть строчку:

```
const SPOOF_USERAGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Shararam/2.0.6 Chrome/80.0.3987.163 Electron/8.5.5 Safari/537.36";
```

Эта строчка объявляет переменную SPOOF_USERAGENT, в которой, как вы видите, тот самый User-Agent, который так ждёт сервер Шарарама. Позднее эта переменная используется для подмены в каждом окне, что приводит к тому, что Шарарам любезно выплёвывает нам страницу с флеш игрой.

Так как мы теперь получаем флеш-игру, а не Unity-огрызок - нам необходим Adobe Flash Player, который как раз таки и взят из проекта Clean Flash.
