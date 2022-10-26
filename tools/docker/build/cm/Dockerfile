# escape=`

ARG BASE_IMAGE
#ARG SXA_IMAGE
ARG SPE_IMAGE
ARG TOOLING_IMAGE
# ARG SOLUTION_IMAGE
ARG HORIZON_RESOURCES_IMAGE

# FROM ${SOLUTION_IMAGE} as solution
FROM ${TOOLING_IMAGE} as tooling
FROM ${SPE_IMAGE} as spe
#FROM ${SXA_IMAGE} as sxa
FROM ${HORIZON_RESOURCES_IMAGE} as horizon_resources
FROM ${BASE_IMAGE}


SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

# Install Url Rewrite
ADD https://download.microsoft.com/download/1/2/8/128E2E22-C1B9-44A4-BE2A-5859ED1D4592/rewrite_amd64_en-US.msi /install/rewrite_amd64.msi
RUN msiexec.exe /i c:\install\rewrite_amd64.msi /L*v installLog.log

# Copy development tools and entrypoint
COPY --from=tooling \tools\ \tools\

WORKDIR C:\inetpub\wwwroot

# Add SPE module
COPY --from=spe \module\cm\content .\

# Add SXA module
#COPY --from=sxa \module\cm\content .\
#COPY --from=sxa \module\tools \module\tools
#RUN C:\module\tools\Initialize-Content.ps1 -TargetPath .\; `
#    Remove-Item -Path C:\module -Recurse -Force;

# Add horizon module
COPY --from=horizon_resources \module\cm\content \inetpub\wwwroot

# Copy solution website files
# COPY --from=solution \artifacts\website\ .\

# # Copy solution transforms
# COPY --from=solution \artifacts\transforms\ \transforms\solution\

# # Perform solution transforms
# RUN If (Test-Path C:\transforms\solution\Foundation\*\code) { Get-ChildItem C:\transforms\solution\Foundation\*\code | ForEach-Object { & C:\tools\scripts\Invoke-XdtTransform.ps1 -Path .\ -XdtPath $_.FullName }; } `
#     If (Test-Path C:\transforms\solution\Feature\*\code) { Get-ChildItem C:\transforms\solution\Feature\*\code | ForEach-Object { & C:\tools\scripts\Invoke-XdtTransform.ps1 -Path .\ -XdtPath $_.FullName }; } `
#     If (Test-Path C:\transforms\solution\Project\*\code) { Get-ChildItem C:\transforms\solution\Project\*\code | ForEach-Object { & C:\tools\scripts\Invoke-XdtTransform.ps1 -Path .\ -XdtPath $_.FullName }; }