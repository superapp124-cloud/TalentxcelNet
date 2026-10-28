import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

const publicDir = path.resolve('public')
const cartoonsDir = path.join(publicDir, 'images', 'cartoons')
const videosDir = path.join(publicDir, 'videos')

const img1 = path.join(cartoonsDir, 'safety.jpg')
const img2 = path.join(cartoonsDir, 'safety_scene2.jpg')
const img3 = path.join(cartoonsDir, 'safety_scene3.jpg')
const audio = path.join(videosDir, 'safety_audio.wav')
const output = path.join(videosDir, 'safety.mp4')

const clip1 = path.join(videosDir, 'safe_clip1.mp4')
const clip2 = path.join(videosDir, 'safe_clip2.mp4')
const clip3 = path.join(videosDir, 'safe_clip3.mp4')
const concatTxt = path.join(videosDir, 'safe_concat.txt')

console.log('Rendering safety.mp4...')

// Clip 1: 9s (270 frames)
execSync(
  `ffmpeg -y -loop 1 -i "${img1}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0015,1.2)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30" -frames:v 270 -c:v libx264 -pix_fmt yuv420p "${clip1}"`,
  { stdio: 'inherit' }
)

// Clip 2: 10s (300 frames)
execSync(
  `ffmpeg -y -loop 1 -i "${img2}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0015,1.2)':x='iw/3-(iw/zoom/3)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30" -frames:v 300 -c:v libx264 -pix_fmt yuv420p "${clip2}"`,
  { stdio: 'inherit' }
)

// Clip 3: 10s (300 frames)
execSync(
  `ffmpeg -y -loop 1 -i "${img3}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.001,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30" -frames:v 300 -c:v libx264 -pix_fmt yuv420p "${clip3}"`,
  { stdio: 'inherit' }
)

fs.writeFileSync(
  concatTxt,
  `file '${clip1.replace(/\\/g, '/')}'\nfile '${clip2.replace(/\\/g, '/')}'\nfile '${clip3.replace(/\\/g, '/')}'\n`
)

execSync(
  `ffmpeg -y -f concat -safe 0 -i "${concatTxt}" -i "${audio}" -c:v copy -c:a aac -b:a 192k -shortest "${output}"`,
  { stdio: 'inherit' }
)

// Clean intermediate
try {
  fs.unlinkSync(clip1)
  fs.unlinkSync(clip2)
  fs.unlinkSync(clip3)
  fs.unlinkSync(concatTxt)
} catch (_) {}

console.log('Successfully generated safety.mp4:', output)
