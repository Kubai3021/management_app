
Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\JakubKapela\Documents\Cogni task\public\logo-full.png"
$destPath = "c:\Users\JakubKapela\Documents\Cogni task\public\logo-transparent.png"

# Load the image
$bmp = [System.Drawing.Bitmap]::FromFile($sourcePath)

# Create a new bitmap with the same dimensions but with alpha channel
$newBmp = new-object System.Drawing.Bitmap $bmp.Width, $bmp.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($newBmp)
$g.DrawImage($bmp, 0, 0)

# Make white transparent
$newBmp.MakeTransparent([System.Drawing.Color]::White)

# Save the new image
$newBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Cleanup
$g.Dispose()
$newBmp.Dispose()
$bmp.Dispose()

Write-Host "Success: Created logo-transparent.png"
