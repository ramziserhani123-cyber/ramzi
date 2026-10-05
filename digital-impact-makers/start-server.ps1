<#
.SYNOPSIS
  Zero-Dependency Local Web Server for Digital Impact Makers Platform
  منصة صُنّاع الأثر الرقمي - جمعية الإبداع الثقافية شتمة - ولاية بسكرة
  Uses native Windows .NET HttpListener. No Node.js or Python required.
#>

$port = 8080
$folder = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    $url = "http://localhost:$port/"
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "  DIGITAL IMPACT MAKERS PLATFORM SERVER RUNNING" -ForegroundColor Green
    Write-Host "  منصة صُنّاع الأثر الرقمي - ولاية بسكرة / شتمة" -ForegroundColor Yellow
    Write-Host "  URL: $url" -ForegroundColor Green
    Write-Host "  Official Proposal: http://localhost:$port/official-proposal.html" -ForegroundColor Cyan
    Write-Host "  Press Ctrl+C in this window to stop the server." -ForegroundColor Gray
    Write-Host "============================================================" -ForegroundColor Cyan

    Start-Process $url

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($path)) { $path = "index.html" }
        $fullPath = Join-Path $folder $path

        if (Test-Path $fullPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $mime = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".svg"  { "image/svg+xml" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".pdf"  { "application/pdf" }
                Default { "application/octet-stream" }
            }
            $response.ContentType = $mime
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found - الصفحة غير موجودة</h1>")
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
