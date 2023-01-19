# S&M Garage

S&M Garage is a learning experience for the developers (Shaked & Michael), as they approached this challenge with little knowledge about a fullstack applications.

## Installation

First clone the repository containing both the server & client folders.

```bash
git clone https://github.com/ShakedSa/FullstackFinalProject.git
```

After you have cloned the repository you will need to install all the dependencies, as they don't go into the repository for preformance issues of the git.

For installing the client dependencies you should first change to the client subfolder.

```bash
cd .\client\
```

Then install the dependencies through the command:

```bash
npm install
```

To start up the client side of the project once the last command is done, simply use the command

```bash
npm start
```
# 

Installing the server dependencies are going to be a similar steps.

First go back to the root of the project.

```bash
cd ..
```

Then change to the server subfolder

```bash
cd .\server\
```

And again use the command:

```bash
npm install
```

Should your server still be missing dependencies also run the commands:

```bash
npm install mongoose
npm install cors
```