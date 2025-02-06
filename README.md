# Minecraft Bedrock Server Setup FOR WINDOWS (linux how-to at the bottom of the page)

## How to Set Up the Server

1. **Download the lateat release ZIP**: Ensure you have all the files in the `MinecraftBedrockServer` folder.

2. **Download the Bedrock Server Executable**:
   - Go to the official Minecraft website and download the Bedrock Dedicated Server executable.
   - Place the `bedrock_server.exe` file in the `MinecraftBedrockServer` directory.
   - not nessesary unless the EXE file in the ZIP is missing

3. **Accept the EULA**:
   - go into the 'MInecraftBedrockServer BY Van Studios folder'
   - Open the `eula.txt` file and change `eula=false` to `eula=true` to accept the End User License Agreement.

5. **Configure the Server**:
   - Edit the `server.properties` file to customize your server settings.
   - can be found in the MinecraftBedrockServer folder
     
6. **Start the Server**:
   - Run the `startBedrockServer.bat` file to start the server.
   - dont run the EXE because the server launcher features wont work

7. **Connect to the Server**:
   - Open Minecraft and connect to the server using `localhost` or `127.0.0.1`.
   - or port forward to play when your not on your wifi
   - easiest way to port forward is through a tunnel i use playit.gg tutorials on how to set that up can be found online

  
## Enjoy Your Game!

# Minecraft Bedrock Server Setup FOR LINUX

## How to Set Up the Server
**INSTRUCTIONS**
_Pre-Req_
1. 7-Zip [](https://www.7-zip.org/download.html)
2. MinecraftBedrockServer For Linux.zip
-------------------------------------------

Run 7-zip and extract the .ZIP file, next Open the README and following the instructions after completing the README run the .BAT file by using wine.

**installing wine**

If your system is 64 bit, enable 32 bit architecture:
`sudo dpkg --add-architecture i386`

Make a note of your distribution name:\
Look for the line with either `UBUNTU_CODENAME` or `VERSION_CODENAME`. If both are present, use the name after `UBUNTU_CODENAME`.

``cat /etc/os-release``

Download and add the repository key:
```
sudo mkdir -pm755 /etc/apt/keyrings
wget -O - https://dl.winehq.org/wine-builds/winehq.key | sudo gpg --dearmor -o /etc/apt/keyrings/winehq-archive.key -
```

Add the repository:\
If your distribution name is not on the list, older [packages may be available](#my-debianubuntu-version-is-not-listed) on the download server. Add **one** repository.Add the repository:
If your distribution name is not on the list, older [packages may be available](https://github.com/viperfighterpilot33066/MinecraftBedrockServer/releases/edit/MinecraftServerForLinux#my-debianubuntu-version-is-not-listed) on the download server. Add one repository.

| Distribution name | Command |
|-------------------|---------|
| **oracular**<br><small>Ubuntu 24.10</small> | `sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/ubuntu/dists/oracular/winehq-oracular.sources` |
| **noble**<br><small>Ubuntu 24.04<br>Linux Mint 22</small> | `sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/ubuntu/dists/noble/winehq-noble.sources` |
| **jammy**<br><small>Ubuntu 22.04<br>Linux Mint 21.x</small> | `sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/ubuntu/dists/jammy/winehq-jammy.sources` |
| **focal**<br><small>Ubuntu 20.04<br>Linux Mint 20.x</small> | `sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/ubuntu/dists/focal/winehq-focal.sources` |
| **trixie**<br><small>Debian Testing</small> | `sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/debian/dists/trixie/winehq-trixie.sources` |
| **bookworm**<br><small>Debian 12</small> | `sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/debian/dists/bookworm/winehq-bookworm.sources` |
| **bullseye**<br><small>Debian 11</small> | `sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/debian/dists/bullseye/winehq-bullseye.sources` |

Update the package information:
`sudo apt update`

Wine branch | Command
-- | --
Stable branch | sudo apt install --install-recommends winehq-stable
Development branch | sudo apt install --install-recommends winehq-devel
Staging branch | sudo apt install --install-recommends winehq-staging

Install **one** of the following packages:

| Wine branch | Command |
|-------------|---------|
| Stable branch | `sudo apt install --install-recommends winehq-stable` |
| Development branch | `sudo apt install --install-recommends winehq-devel` |
| Staging branch | `sudo apt install --install-recommends winehq-staging` |

next execute
`wine cmd`
After that windows cmd will be played on your terminal. Go to the folder where your .bat file is located and copy the files location into the terminal and press enter. It will successfully run.
