import cv2
import numpy as np
import math
import os
import random
import subprocess
from PIL import Image, ImageDraw, ImageFont

def create_radial_gradient(width, height):
    """Creates a soft cinema vignette."""
    Y, X = np.ogrid[:height, :width]
    center_y, center_x = height / 2.0, width / 2.0
    dist = np.sqrt((X - center_x) ** 2 + (Y - center_y) ** 2)
    max_dist = np.sqrt(center_x ** 2 + center_y ** 2)
    vignette = 1.0 - (dist / max_dist) * 0.45
    vignette = np.clip(vignette, 0.4, 1.0)
    return np.dstack([vignette] * 3).astype(np.float32)

class Particle:
    def __init__(self, w, h, ptype='dust'):
        self.w, self.h = w, h
        self.ptype = ptype
        self.reset(random_y=True)

    def reset(self, random_y=False):
        self.x = random.uniform(0, self.w)
        self.y = random.uniform(0, self.h) if random_y else -20
        self.size = random.uniform(2, 6) if self.ptype == 'dust' else random.uniform(6, 14)
        self.vx = random.uniform(-0.8, 0.8)
        self.vy = random.uniform(0.5, 1.5) if self.ptype == 'dust' else random.uniform(2.5, 5.5)
        self.alpha = random.uniform(0.3, 0.8)
        self.color = random.choice([
            (255, 215, 0),   # Gold
            (50, 205, 50),   # Green
            (30, 144, 255),  # Dodger blue
            (255, 105, 180), # Hot pink
            (255, 255, 255)  # White
        ]) if self.ptype == 'confetti' else (255, 240, 200)
        self.rotation = random.uniform(0, 360)
        self.vrot = random.uniform(-5, 5)

    def update(self):
        self.x += self.vx
        self.y += self.vy
        self.rotation += self.vrot
        if self.y > self.h + 20 or self.x < -20 or self.x > self.w + 20:
            self.reset(random_y=False)

    def draw(self, frame):
        ix, iy = int(self.x), int(self.y)
        if 0 <= ix < self.w and 0 <= iy < self.h:
            if self.ptype == 'dust':
                cv2.circle(frame, (ix, iy), int(self.size), self.color, -1, cv2.LINE_AA)
            elif self.ptype == 'confetti':
                # Draw rotating rectangle
                rect_w, rect_h = int(self.size), int(self.size * 0.6)
                pts = np.array([[-rect_w//2, -rect_h//2], [rect_w//2, -rect_h//2],
                                [rect_w//2, rect_h//2], [-rect_w//2, rect_h//2]], dtype=np.float32)
                rad = math.radians(self.rotation)
                c, s = math.cos(rad), math.sin(rad)
                rot_mat = np.array([[c, -s], [s, c]])
                pts_rot = (pts @ rot_mat).astype(np.int32) + [ix, iy]
                cv2.fillConvexPoly(frame, pts_rot, self.color, cv2.LINE_AA)

def apply_cinematic_motion(img, t, total_t, w=1280, h=720, mode='push_in'):
    """
    Applies dynamic zoom, breathing sine wave, and camera micro-sway.
    """
    h_orig, w_orig = img.shape[:2]
    progress = t / max(0.001, total_t)

    # 1. Base Zoom profile (ease-in-out curve)
    if mode == 'push_in':
        zoom = 1.05 + 0.15 * (1.0 - math.cos(progress * math.pi)) / 2.0
        center_x = w_orig * (0.50 + 0.03 * math.sin(progress * math.pi))
        center_y = h_orig * (0.48 - 0.02 * progress)
    elif mode == 'pull_out':
        zoom = 1.20 - 0.12 * progress
        center_x = w_orig * 0.50
        center_y = h_orig * 0.50
    elif mode == 'pan_right':
        zoom = 1.15
        center_x = w_orig * (0.42 + 0.16 * progress)
        center_y = h_orig * 0.50
    else: # close_up_breath
        zoom = 1.25 + 0.02 * math.sin(t * math.pi * 1.5)
        center_x = w_orig * 0.55
        center_y = h_orig * 0.40

    # 2. Living Character Micro-Sway (Breathing & organic camera drift)
    sway_x = math.sin(t * 1.8) * 3.0
    sway_y = math.cos(t * 1.4) * 4.0
    center_x += sway_x
    center_y += sway_y

    # Calculate crop box in source image
    crop_w = w_orig / zoom
    crop_h = h_orig / zoom

    x1 = int(np.clip(center_x - crop_w / 2.0, 0, w_orig - crop_w))
    y1 = int(np.clip(center_y - crop_h / 2.0, 0, h_orig - crop_h))
    x2 = int(x1 + crop_w)
    y2 = int(y1 + crop_h)

    cropped = img[y1:y2, x1:x2]
    resized = cv2.resize(cropped, (w, h), interpolation=cv2.INTER_LINEAR)
    return resized

def draw_pill(frame, text, x, y, bg_color=(20, 20, 20), text_color=(255, 255, 255), icon='⭐'):
    """Draws a modern rounded glassmorphism pill badge."""
    overlay = frame.copy()
    font = cv2.FONT_HERSHEY_DUPLEX
    font_scale = 0.55
    thickness = 1
    (tw, th), _ = cv2.getTextSize(text, font, font_scale, thickness)
    
    pad_x, pad_y = 16, 8
    pill_w = tw + pad_x * 2 + 25
    pill_h = th + pad_y * 2
    
    cv2.rectangle(overlay, (x, y), (x + pill_w, y + pill_h), bg_color, -1, cv2.LINE_AA)
    cv2.addWeighted(overlay, 0.85, frame, 0.15, 0, frame)
    cv2.rectangle(frame, (x, y), (x + pill_w, y + pill_h), (255, 255, 255), 1, cv2.LINE_AA)
    
    # Text
    cv2.putText(frame, text, (x + pad_x + 15, y + pill_h - pad_y), font, font_scale, text_color, thickness, cv2.LINE_AA)

def draw_action_card(frame, title, step_text, progress, w=1280, h=720):
    """Draws a smooth sliding animated action checklist card."""
    card_w, card_h = 420, 80
    target_x = 40
    target_y = h - 130

    # Slide-in transition (bounce ease)
    slide_p = min(1.0, progress * 4.0)
    current_x = int(target_x - (1.0 - slide_p) * 200)

    if current_x > -card_w:
        overlay = frame.copy()
        cv2.rectangle(overlay, (current_x, target_y), (current_x + card_w, target_y + card_h), (15, 23, 42), -1)
        cv2.addWeighted(overlay, 0.85, frame, 0.15, 0, frame)
        cv2.rectangle(frame, (current_x, target_y), (current_x + card_w, target_y + card_h), (59, 130, 246), 2, cv2.LINE_AA)
        
        # Checkmark Icon
        cv2.circle(frame, (current_x + 30, target_y + 40), 16, (16, 185, 129), -1, cv2.LINE_AA)
        cv2.putText(frame, "OK", (current_x + 19, target_y + 45), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (255, 255, 255), 1, cv2.LINE_AA)

        # Title
        cv2.putText(frame, title.upper(), (current_x + 60, target_y + 30), cv2.FONT_HERSHEY_DUPLEX, 0.42, (147, 197, 253), 1, cv2.LINE_AA)
        # Step text (shortened)
        short_step = step_text[:40] + ("..." if len(step_text) > 40 else "")
        cv2.putText(frame, short_step, (current_x + 60, target_y + 55), cv2.FONT_HERSHEY_DUPLEX, 0.48, (255, 255, 255), 1, cv2.LINE_AA)

def draw_hud(frame, current_t, duration, act, act_title, w=1280, h=720):
    """Draws top HUD with act title and animated timeline scrubber."""
    # Top bar badge
    badge_colors = {
        1: (200, 130, 20),   # Amber/Orange
        2: (220, 100, 20),   # Blue
        3: (40, 180, 80)     # Emerald
    }
    draw_pill(frame, f"ACT {act} : {act_title}", 40, 30, bg_color=badge_colors.get(act, (20, 20, 20)), text_color=(255, 255, 255))

    # Time counter
    mins = int(current_t) // 60
    secs = int(current_t) % 60
    tot_mins = int(duration) // 60
    tot_secs = int(duration) % 60
    time_str = f"{mins:02d}:{secs:02d} / {tot_mins:02d}:{tot_secs:02d}"
    draw_pill(frame, time_str, w - 170, 30, bg_color=(20, 24, 33), text_color=(220, 230, 242))

    # Scrubber line at bottom
    scrubber_y = h - 14
    cv2.line(frame, (40, scrubber_y), (w - 40, scrubber_y), (80, 90, 110), 3, cv2.LINE_AA)
    progress_x = int(40 + (w - 80) * (current_t / max(1, duration)))
    cv2.line(frame, (40, scrubber_y), (progress_x, scrubber_y), (59, 130, 246), 4, cv2.LINE_AA)
    cv2.circle(frame, (progress_x, scrubber_y), 6, (255, 255, 255), -1, cv2.LINE_AA)

def render_cinematic_track_video(config):
    """
    Renders a high-energy cinematic motion video for a life skill track.
    """
    w, h = 1280, 720
    fps = 30
    duration = config['duration']
    total_frames = int(duration * fps)
    
    print(f"\n[ANIMATOR] Starting render for '{config['title']}' ({duration:.1f}s, {total_frames} frames)...")

    # Load and verify images
    images = []
    for p in config['scenes']:
        if not os.path.exists(p):
            raise FileNotFoundError(f"Missing scene image: {p}")
        img = cv2.imread(p)
        images.append(img)
    
    vignette = create_radial_gradient(w, h)
    particles = [Particle(w, h, ptype='dust') for _ in range(40)]
    confetti = [Particle(w, h, ptype='confetti') for _ in range(70)]

    temp_raw_mp4 = config['output'].replace('.mp4', '_raw.mp4')
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(temp_raw_mp4, fourcc, fps, (w, h))

    # Calculate act timings
    act1_end = duration * 0.33
    act2_end = duration * 0.66

    # Segment choreography: 6 dynamic camera shots
    shot_duration = duration / 6.0

    for f in range(total_frames):
        t = f / fps
        shot_idx = int(t / shot_duration)
        shot_t = t - (shot_idx * shot_duration)

        # Determine active scene & camera movement mode
        if t < act1_end:
            act = 1
            act_title = "The Challenge"
            img_idx = 0
            mode = 'push_in' if shot_idx == 0 else 'close_up_breath'
        elif t < act2_end:
            act = 2
            act_title = "5 Action Steps"
            img_idx = 1 if len(images) > 1 else 0
            mode = 'pan_right' if shot_idx == 2 else 'push_in'
        else:
            act = 3
            act_title = "Victory & Mastery!"
            img_idx = 2 if len(images) > 2 else (1 if len(images) > 1 else 0)
            mode = 'pull_out' if shot_idx == 4 else 'close_up_breath'

        base_img = images[img_idx]
        frame = apply_cinematic_motion(base_img, shot_t, shot_duration, w, h, mode=mode)

        # Apply cinema vignette
        frame = (frame.astype(np.float32) * vignette).astype(np.uint8)

        # Update and draw ambient particles
        for p in particles:
            p.update()
            p.draw(frame)

        # In Act 3: Burst celebratory confetti!
        if act == 3:
            for c in confetti:
                c.update()
                c.draw(frame)

        # Action card overlay during Act 2
        if act == 2:
            step_idx = min(len(config['steps']) - 1, int((t - act1_end) / ((act2_end - act1_end) / len(config['steps']))))
            step_text = config['steps'][step_idx]
            card_progress = (t - act1_end) / (act2_end - act1_end)
            draw_action_card(frame, f"Step {step_idx + 1}", step_text, card_progress, w, h)

        # HUD overlay (Act pill, timer, timeline)
        draw_hud(frame, t, duration, act, act_title, w, h)

        # Shot transition cross-dissolve (4 frames)
        if shot_t < 0.15 and shot_idx > 0:
            flash_alpha = (0.15 - shot_t) / 0.15
            white_flash = np.full_like(frame, 255)
            frame = cv2.addWeighted(white_flash, flash_alpha * 0.35, frame, 1.0 - (flash_alpha * 0.35), 0)

        out.write(frame)

        if f % 90 == 0:
            print(f"  Frame {f}/{total_frames} ({f*100//total_frames}% done)")

    out.release()
    print("  Visual animation frames written.")

    # Mux with audio using FFmpeg with optimal AAC encoding
    audio_path = config['audio']
    final_mp4 = config['output']

    print(f"  Muxing with audio {audio_path} -> {final_mp4}...")
    cmd = [
        'ffmpeg', '-y',
        '-i', temp_raw_mp4,
        '-i', audio_path,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'fast',
        '-crf', '22',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        final_mp4
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

    if os.path.exists(temp_raw_mp4):
        os.remove(temp_raw_mp4)

    file_size_mb = os.path.getsize(final_mp4) / (1024 * 1024)
    print(f"[ANIMATOR] SUCCESS! Generated '{final_mp4}' ({file_size_mb:.2f} MB)")

TRACKS = [
    {
        'id': 'money-management',
        'title': 'Money Management & Smart Budgeting',
        'duration': 36.8,
        'scenes': [
            'public/images/cartoons/money.jpg',
            'public/images/cartoons/money_scene2.jpg',
            'public/images/cartoons/money_scene3.jpg',
        ],
        'audio': 'public/videos/money_audio.wav',
        'steps': [
            'Separate Needs from Wants on notepad',
            'Calculate total cost before buying',
            'Pay exact price and count change',
            'Deposit saved balance in piggy bank',
            'Celebrate financial independence!'
        ],
        'output': 'public/videos/money-management.mp4'
    },
    {
        'id': 'independence',
        'title': 'Morning Routine & Timetable Mastery',
        'duration': 27.2,
        'scenes': [
            'public/images/cartoons/independence.jpg',
            'public/images/cartoons/independence_scene2.jpg',
            'public/images/cartoons/independence_scene3.jpg',
        ],
        'audio': 'public/videos/independence_audio.wav',
        'steps': [
            'Check tomorrow\'s timetable on wall board',
            'Pack required books only (leave extras at home)',
            'Verify bag weight on scale under 3.0 kg',
            'Set morning alarm and sleep on time',
            'Walk to school confident and independent!'
        ],
        'output': 'public/videos/independence.mp4'
    },
    {
        'id': 'communication',
        'title': 'Speaking Confidence & Active Listening',
        'duration': 25.3,
        'scenes': [
            'public/images/cartoons/communication.jpg',
            'public/images/cartoons/communication_scene2.jpg',
            'public/images/cartoons/communication_scene3.jpg',
        ],
        'audio': 'public/videos/communication_audio.wav',
        'steps': [
            'Take a slow calming deep breath',
            'Make friendly eye contact with the class',
            'Speak at a steady, clear volume',
            'Listen respectfully without interrupting',
            'Earn the classroom presentation star!'
        ],
        'output': 'public/videos/communication.mp4'
    },
    {
        'id': 'safety',
        'title': 'First Aid & Playground Health Safety',
        'duration': 28.3,
        'scenes': [
            'public/images/cartoons/safety.jpg',
            'public/images/cartoons/safety_scene2.jpg',
            'public/images/cartoons/safety_scene3.jpg',
        ],
        'audio': 'public/videos/safety_audio.wav',
        'steps': [
            'Stay calm and notify a teacher or nurse',
            'Clean the scrape gently with clean water',
            'Apply antiseptic wipe and sterile bandage',
            'Rest comfortably and keep kit organized',
            'Receive the Junior Safety Hero badge!'
        ],
        'output': 'public/videos/safety.mp4'
    },
    {
        'id': 'teamwork',
        'title': 'Teamwork & Science Fair Collaboration',
        'duration': 24.3,
        'scenes': [
            'public/images/cartoons/teamwork.jpg',
            'public/images/cartoons/teamwork.jpg',
            'public/images/cartoons/teamwork.jpg',
        ],
        'audio': 'public/videos/teamwork_audio.wav',
        'steps': [
            'Listen to every teammate\'s ideas equally',
            'Divide robot assembly tasks fairly',
            'Encourage each other when parts don\'t fit',
            'Test the prototype together as Team Innovate',
            'Celebrate winning 1st Place together!'
        ],
        'output': 'public/videos/teamwork.mp4'
    }
]

if __name__ == '__main__':
    import sys
    target = sys.argv[1] if len(sys.argv) > 1 else 'all'
    for track in TRACKS:
        if target == 'all' or track['id'] == target:
            render_cinematic_track_video(track)
