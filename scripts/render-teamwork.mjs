import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'

const publicDir = path.resolve('public')
const cartoonsDir = path.join(publicDir, 'images', 'cartoons')
const videosDir = path.join(publicDir, 'videos')

const img1 = path.join(cartoonsDir, 'teamwork.jpg')
const audio = path.join(videosDir, 'teamwork_audio.wav')
const output = path.join(videosDir, 'teamwork.mp4')

const clip1 = path.join(videosDir, 'team_clip1.mp4')
const clip2 = path.join(videosDir, 'team_clip2.mp4')
const clip3 = path.join(videosDir, 'team_clip3.mp4')
const concatTxt = path.join(videosDir, 'team_concat.txt')

console.log('Rendering teamwork.mp4...')

// Clip 1: 8s (240 frames) - Pan across the team working table
execSync(
  `ffmpeg -y -loop 1 -i "${img1}" -vf "scale=2560:1440,crop=1920:1080:x='(t/8)*(2560-1920)':y=360" -frames:v 240 -c:v libx264 -pix_fmt yuv420p "${clip1}"`,
  { stdio: 'inherit' }
)

// Clip 2: 8s (240 frames) - Zoom into robot and first place ribbon
execSync(
  `ffmpeg -y -loop 1 -i "${img1}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0018,1.25)':x='iw/2-(iw/zoom/2)':y='ih/3-(ih/zoom/3)':d=1:s=1920x1080:fps=30" -frames:v 240 -c:v libx264 -pix_fmt yuv420p "${clip2}"`,
  { stdio: 'inherit' }
)

// Clip 3: 9s (270 frames) - Wide celebratory shot
execSync(
  `ffmpeg -y -loop 1 -i "${img1}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='max(1.15-0.001,1.0)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30" -frames:v 270 -c:v libx264 -pix_fmt yuv420p "${clip3}"`,
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

console.log('Successfully generated teamwork.mp4:', output)
