# escape=`

ARG NODE_INSTALLER_IMAGE
ARG BASE_IMAGE


FROM ${NODE_INSTALLER_IMAGE} as installer

ARG NODE_VERSION

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop';$ProgressPreference='silentlyContinue';"]

RUN Invoke-WebRequest -OutFile nodejs.zip -UseBasicParsing "https://nodejs.org/dist/${env:NODE_VERSION}/node-${env:NODE_VERSION}-win-x64.zip"; `
Expand-Archive nodejs.zip -DestinationPath C:\; `
Rename-Item "C:\\node-${env:NODE_VERSION}-win-x64" c:\nodejs

FROM ${BASE_IMAGE}

USER Administrator
WORKDIR C:\nodejs
COPY --from=installer C:\nodejs\ .
RUN SETX PATH C:\nodejs
RUN npm config set registry https://registry.npmjs.org/

WORKDIR C:\app

COPY package*.json .\

RUN npm install -g gulp-cli
RUN npm install

RUN npx browserslist@latest --update-db

COPY [".babelrc", ".eslintrc.json", "gulpfile.js", ".stylelintrc.json", ".\\"]
COPY frontend\ .\frontend\
COPY tools\gulp\ .\tools\gulp\

RUN node_modules\.bin\gulp build-all --no-watch