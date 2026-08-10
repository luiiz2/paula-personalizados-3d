[CmdletBinding()]
param(
  [Parameter(Position = 0)]
  [ValidateSet('help', 'doctor', 'setup', 'dev', 'lint', 'test', 'test-watch', 'build', 'check', 'preview', 'github')]
  [string]$Task = 'help'
)

$ErrorActionPreference = 'Stop'
$ProjectRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$UserProfileDirectory = [Environment]::GetFolderPath('UserProfile')

function Resolve-ProjectTool {
  param(
    [Parameter(Mandatory)]
    [string]$CommandName,

    [Parameter(Mandatory)]
    [string[]]$CandidatePaths
  )

  $ResolvedCommand = Get-Command $CommandName -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($null -ne $ResolvedCommand -and $ResolvedCommand.Source) {
    return $ResolvedCommand.Source
  }

  foreach ($CandidatePath in $CandidatePaths) {
    if ($CandidatePath -and (Test-Path -LiteralPath $CandidatePath)) {
      return (Resolve-Path -LiteralPath $CandidatePath).Path
    }
  }

  return $null
}

$NodePath = Resolve-ProjectTool -CommandName 'node.exe' -CandidatePaths @(
  'C:\Program Files\nodejs\node.exe',
  (Join-Path $UserProfileDirectory 'AppData\Local\Programs\nodejs\node.exe'),
  (Join-Path $UserProfileDirectory '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe')
)

$NpmPath = Resolve-ProjectTool -CommandName 'npm.cmd' -CandidatePaths @(
  'C:\Program Files\nodejs\npm.cmd',
  $(if ($NodePath) { Join-Path (Split-Path -Parent $NodePath) 'npm.cmd' }),
  (Join-Path $UserProfileDirectory 'AppData\Roaming\npm\npm.cmd')
)

$GitPath = Resolve-ProjectTool -CommandName 'git.exe' -CandidatePaths @(
  'C:\Program Files\Git\cmd\git.exe',
  (Join-Path $UserProfileDirectory '.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe')
)

$GitHubCliPath = Resolve-ProjectTool -CommandName 'gh.exe' -CandidatePaths @(
  'C:\Program Files\GitHub CLI\gh.exe',
  (Join-Path $UserProfileDirectory 'AppData\Local\Programs\GitHub CLI\gh.exe'),
  (Join-Path $UserProfileDirectory 'scoop\apps\gh\current\bin\gh.exe')
)

function Require-ProjectTool {
  param(
    [Parameter(Mandatory)]
    [string]$ToolName,

    [AllowNull()]
    [string]$ToolPath,

    [Parameter(Mandatory)]
    [string]$InstallHint
  )

  if (-not $ToolPath) {
    throw "$ToolName não foi encontrado. $InstallHint"
  }
}

function Invoke-ProjectExecutable {
  param(
    [Parameter(Mandatory)]
    [string]$Executable,

    [string[]]$ToolArguments = @()
  )

  & $Executable @ToolArguments
  if ($LASTEXITCODE -ne 0) {
    throw "O comando falhou com código $LASTEXITCODE."
  }
}

function Invoke-NodeTool {
  param(
    [Parameter(Mandatory)]
    [string]$RelativeScriptPath,

    [string[]]$ToolArguments = @()
  )

  Require-ProjectTool -ToolName 'Node.js' -ToolPath $NodePath -InstallHint 'Instale pelo site nodejs.org ou com winget install OpenJS.NodeJS.LTS.'

  $ScriptPath = Join-Path $ProjectRoot $RelativeScriptPath
  if (-not (Test-Path -LiteralPath $ScriptPath)) {
    throw "Dependência ausente: $RelativeScriptPath. Execute '.\project.cmd setup'."
  }

  $CombinedArguments = @($ScriptPath) + $ToolArguments
  Invoke-ProjectExecutable -Executable $NodePath -ToolArguments $CombinedArguments
}

function Show-ProjectHelp {
  @'
Paula Personalizados 3D — comandos do projeto

  .\project.cmd doctor      Verifica Node, npm, Git e GitHub CLI
  .\project.cmd setup       Instala exatamente o package-lock.json
  .\project.cmd dev         Inicia o Vite para desenvolvimento
  .\project.cmd lint        Executa o Oxlint
  .\project.cmd test        Executa os testes uma vez
  .\project.cmd test-watch  Executa os testes em modo watch
  .\project.cmd build       Gera o build de produção
  .\project.cmd check       Executa lint, testes e build
  .\project.cmd preview     Abre o servidor local do build
  .\project.cmd github      Mostra autenticação e estado do Git

Esse launcher procura as ferramentas nos locais comuns do Windows e não depende
de o PATH da sessão ter sido atualizado.
'@ | Write-Host
}

Set-Location -LiteralPath $ProjectRoot

switch ($Task) {
  'help' {
    Show-ProjectHelp
  }

  'doctor' {
    Write-Host "Projeto: $ProjectRoot"
    Write-Host "Node:   $(if ($NodePath) { $NodePath } else { 'NÃO ENCONTRADO' })"
    Write-Host "npm:    $(if ($NpmPath) { $NpmPath } else { 'NÃO ENCONTRADO' })"
    Write-Host "Git:    $(if ($GitPath) { $GitPath } else { 'NÃO ENCONTRADO' })"
    Write-Host "gh:     $(if ($GitHubCliPath) { $GitHubCliPath } else { 'NÃO ENCONTRADO' })"
    Write-Host "Deps:   $(if (Test-Path -LiteralPath (Join-Path $ProjectRoot 'node_modules')) { 'instaladas' } else { 'ausentes — execute setup' })"

    if ($NodePath) { Invoke-ProjectExecutable -Executable $NodePath -ToolArguments @('--version') }
    if ($NpmPath) { Invoke-ProjectExecutable -Executable $NpmPath -ToolArguments @('--version') }
    if ($GitPath) { Invoke-ProjectExecutable -Executable $GitPath -ToolArguments @('--version') }
    if ($GitHubCliPath) { Invoke-ProjectExecutable -Executable $GitHubCliPath -ToolArguments @('--version') }
  }

  'setup' {
    Require-ProjectTool -ToolName 'npm' -ToolPath $NpmPath -InstallHint 'Instale o Node.js LTS, que inclui o npm.'
    Invoke-ProjectExecutable -Executable $NpmPath -ToolArguments @('ci')
  }

  'dev' {
    Invoke-NodeTool -RelativeScriptPath 'node_modules\vite\bin\vite.js'
  }

  'lint' {
    Invoke-NodeTool -RelativeScriptPath 'node_modules\oxlint\bin\oxlint'
  }

  'test' {
    Invoke-NodeTool -RelativeScriptPath 'node_modules\vitest\vitest.mjs' -ToolArguments @('run')
  }

  'test-watch' {
    Invoke-NodeTool -RelativeScriptPath 'node_modules\vitest\vitest.mjs'
  }

  'build' {
    Invoke-NodeTool -RelativeScriptPath 'node_modules\typescript\bin\tsc' -ToolArguments @('-b')
    Invoke-NodeTool -RelativeScriptPath 'node_modules\vite\bin\vite.js' -ToolArguments @('build')
  }

  'check' {
    Invoke-NodeTool -RelativeScriptPath 'node_modules\oxlint\bin\oxlint'
    Invoke-NodeTool -RelativeScriptPath 'node_modules\vitest\vitest.mjs' -ToolArguments @('run')
    Invoke-NodeTool -RelativeScriptPath 'node_modules\typescript\bin\tsc' -ToolArguments @('-b')
    Invoke-NodeTool -RelativeScriptPath 'node_modules\vite\bin\vite.js' -ToolArguments @('build')
  }

  'preview' {
    Invoke-NodeTool -RelativeScriptPath 'node_modules\vite\bin\vite.js' -ToolArguments @('preview')
  }

  'github' {
    Require-ProjectTool -ToolName 'Git' -ToolPath $GitPath -InstallHint 'Instale com winget install Git.Git.'
    Require-ProjectTool -ToolName 'GitHub CLI' -ToolPath $GitHubCliPath -InstallHint 'Instale com winget install GitHub.cli.'
    Invoke-ProjectExecutable -Executable $GitHubCliPath -ToolArguments @('auth', 'status')
    Invoke-ProjectExecutable -Executable $GitPath -ToolArguments @('status', '-sb')
  }
}
