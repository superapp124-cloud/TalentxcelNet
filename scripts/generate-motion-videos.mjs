import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

const publicDir = path.resolve('public')
const cartoonsDir = path.join(publicDir, 'images', 'cartoons')
const videosDir = path.join(publicDir, 'videos')

if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true })
}

console.log('Rendering 3-scene animated motion video for Money Management...')

const img1 = path.join(cartoonsDir, 'money.jpg')
const img2 = path.join(cartoonsDir, 'money_scene2.jpg')
const img3 = path.join(cartoonsDir, 'money_scene3.jpg')
const audio = path.join(videosDir, 'money_audio.wav')
const output = path.join(videosDir, 'money-management.mp4')

const clip1 = path.join(videosDir, 'clip1.mp4')
const clip2 = path.join(videosDir, 'clip2.mp4')
const clip3 = path.join(videosDir, 'clip3.mp4')
const concatTxt = path.join(videosDir, 'concat.txt')

// Clip 1: 12 seconds with gentle zoom
execSync(
  `ffmpeg -y -loop 1 -t 12 -i "${img1}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0012,1.2)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=360:s=1920x1080:fps=30" -c:v libx264 -pix_fmt yuv420p "${clip1}"`,
  { stdio: 'inherit' }
)

// Clip 2: 12 seconds with zoom to notepad
execSync(
  `ffmpeg -y -loop 1 -t 12 -i "${img2}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0012,1.2)':x='iw/2-(iw/zoom/2)':y='ih/3-(ih/zoom/3)':d=360:s=1920x1080:fps=30" -c:v libx264 -pix_fmt yuv420p "${clip2}"`,
  { stdio: 'inherit' }
)

// Clip 3: 13 seconds with zoom to victory
execSync(
  `ffmpeg -y -loop 1 -t 13 -i "${img3}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.001,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=390:s=1920x1080:fps=30" -c:v libx264 -pix_fmt yuv420p "${clip3}"`,
  { stdio: 'inherit' }
)

// Write concat file
fs.writeFileSync(
  concatTxt,
  `file '${clip1.replace(/\\/g, '/')}'\nfile '${clip2.replace(/\\/g, '/')}'\nfile '${clip3.replace(/\\/g, '/')}'\n`
)

// Concatenate and add audio
execSync(
  `ffmpeg -y -f concat -safe 0 -i "${concatTxt}" -i "${audio}" -c:v copy -c:a aac -b:a 192k -shortest "${output}"`,
  { stdio: 'inherit' }
)

console.log('Successfully generated motion video:', output)
