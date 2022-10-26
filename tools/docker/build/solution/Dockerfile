# escape=`

ARG BASE_IMAGE
ARG BUILD_IMAGE
# Custom ARG
ARG NODE_IMAGE

FROM ${NODE_IMAGE} AS frontend

FROM ${BUILD_IMAGE} AS prep
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

# Gather only artifacts necessary for NuGet restore, retaining directory structure
COPY *.sln .nuget\nuget.config \nuget\

COPY src\ \temp\
RUN Invoke-Expression 'robocopy C:\temp C:\nuget\src /s /ndl /njh /njs *.csproj *.scproj packages.config'

FROM ${BUILD_IMAGE} AS builder

ARG PROPERTIES_FILE
ARG BUILD_CONFIGURATION

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

# Create an empty working directory
WORKDIR C:\build

# Copy prepped NuGet artifacts, and restore as distinct layer to take better advantage of caching
#COPY --from=prep .\nuget .\
#RUN nuget restore

# Copy remaining source code
COPY \ .\

#COPY FE Assets
COPY --from=frontend C:\app\src .\src\

# Custom NANT task
RUN Invoke-Command { .\nant.bat init -D:env=$env:PROPERTIES_FILE }

# Copy transforms, retaining directory structure
RUN Invoke-Expression 'robocopy C:\build\src C:\out\transforms /s /ndl /njh /njs *.xdt'

# Customized
# Build website with file publish
RUN msbuild .\Thread-Sitecore_FastBuild.proj /p:Configuration=$env:BUILD_CONFIGURATION /p:DeployOnBuild=True /p:DeployDefaultTarget=WebPublish /p:WebPublishMethod=FileSystem /p:PublishUrl=C:\out\website

# Build XConnect with file publish
#RUN msbuild .\src\DockerExamples.XConnect\DockerExamples.XConnect.csproj /p:Configuration=$env:BUILD_CONFIGURATION /p:DeployOnBuild=True /p:DeployDefaultTarget=WebPublish /p:WebPublishMethod=FileSystem /p:PublishUrl=C:\out\xconnect

RUN Invoke-Expression 'cmd.exe /c if not exist "c:\out\xconnect" mkdir c:\out\xconnect'

FROM ${BASE_IMAGE}

WORKDIR C:\artifacts

# Copy final build artifacts
COPY --from=builder C:\out\website .\website\
COPY --from=builder C:\out\transforms .\transforms\
COPY --from=builder C:\out\xconnect .\xconnect\