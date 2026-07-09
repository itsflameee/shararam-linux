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

## Установка

### AppImage - любой дистрибутив
Самый простой способ поиграть прямо сейчас - скачать [shararam-linux.AppImage](https://github.com/itsflameee/shararam-linux/releases/download/v2.0.6/shararam-linux.AppImage) и запустить. Этот способ не требует установки, и работает как портативная программа. Чтобы удалить Шарарам - нам необходимо просто удалить .AppImage

### AUR - Arch Linux
Пока что AUR-пакета на Arch Linux нет, позднее если не забуду добавлю.

### Ручная установка - любой дистрибутив
Для ручной установки выполните следующие команды:

```
# скачиваем .tar.gz
wget https://github.com/itsflameee/shararam-linux/releases/download/v2.0.6/shararam-linux.tar.gz && \
# создаём директорию для shararam-linux
sudo mkdir -p /opt/shararam-linux && \
# распаковываем .tar.gz
sudo tar -xzf shararam-linux.tar.gz -C /opt/shararam-linux/ && \
# размещаем иконку в системе
sudo cp /opt/shararam-linux/shararam.png /usr/share/pixmaps/shararam.png && \
# размещаем ярлык в меню приложений
sudo cp /opt/shararam-linux/shararam.desktop /usr/share/applications/shararam.desktop && \
# разрешаем запуск бинарника
sudo chmod +x /opt/shararam-linux/shararam
```

### Удаление после ручной установки - любой дистрибутив

```
# удаляем директорию игры
sudo rm -rf /opt/shararam-linux && \
# удаляем иконку
sudo rm /usr/share/pixmaps/shararam.png && \
# удаляем ярлык
sudo rm /usr/share/applications/shararam.desktop
```
