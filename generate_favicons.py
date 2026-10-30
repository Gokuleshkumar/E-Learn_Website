import os
from PIL import Image, ImageDraw

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))

def lerp_color(c1, c2, t):
    return (
        int(c1[0] + (c2[0] - c1[0]) * t),
        int(c1[1] + (c2[1] - c1[1]) * t),
        int(c1[2] + (c2[2] - c1[2]) * t)
    )

def draw_gradient_line(draw, p1, p2, width, color1, color2, steps=100):
    dx = p2[0] - p1[0]
    dy = p2[1] - p1[1]
    dist = (dx**2 + dy**2)**0.5
    if dist == 0:
        return
    num_steps = max(int(dist / 2), steps)
    r = width / 2.0
    for i in range(num_steps + 1):
        t = i / float(num_steps)
        cx = p1[0] + dx * t
        cy = p1[1] + dy * t
        col = lerp_color(color1, color2, t)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)

def create_favicon_image(size=512):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Rounded background #141417
    bg_color = hex_to_rgb('#141417')
    corner_radius = int(size * 0.22)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=corner_radius, fill=bg_color)
    
    # Emblem points scaled to 512
    # Base coords: top (50, 24), bottom-left (25, 72), bottom-right (75, 72)
    # crossbar left (37, 49), crossbar right (63, 49)
    scale = size / 100.0
    p1 = (50.0 * scale, 24.0 * scale)
    p2 = (25.0 * scale, 72.0 * scale)
    p3 = (75.0 * scale, 72.0 * scale)
    p4 = (37.0 * scale, 49.0 * scale)
    p5 = (63.0 * scale, 49.0 * scale)
    
    stroke_w = 11.0 * scale
    radius = 7.5 * scale
    
    c_blue = hex_to_rgb('#3b82f6')
    c_purple = hex_to_rgb('#8B5CF6')
    
    # Left leg: P2 to P1 (blue to purple)
    draw_gradient_line(draw, p2, p1, stroke_w, c_blue, c_purple, steps=150)
    # Right leg: P1 to P3 (purple to blue)
    draw_gradient_line(draw, p1, p3, stroke_w, c_purple, c_blue, steps=150)
    # Crossbar: P4 to P5 (gradient)
    draw_gradient_line(draw, p4, p5, stroke_w, c_blue, c_purple, steps=100)
    
    # Draw circular nodes
    draw.ellipse([p1[0] - radius, p1[1] - radius, p1[0] + radius, p1[1] + radius], fill=c_purple)
    draw.ellipse([p2[0] - radius, p2[1] - radius, p2[0] + radius, p2[1] + radius], fill=c_blue)
    draw.ellipse([p3[0] - radius, p3[1] - radius, p3[0] + radius, p3[1] + radius], fill=c_blue)
    
    return img

if __name__ == '__main__':
    frontend_dir = r'c:\Users\gokul\OneDrive\Desktop\OneDrive\Desktop\E-learnwebsiteproject\google-login-node\frontend'
    
    base_img = create_favicon_image(512)
    
    # Save standard PNGs
    img_16 = base_img.resize((16, 16), Image.Resampling.LANCZOS)
    img_32 = base_img.resize((32, 32), Image.Resampling.LANCZOS)
    img_48 = base_img.resize((48, 48), Image.Resampling.LANCZOS)
    img_180 = base_img.resize((180, 180), Image.Resampling.LANCZOS)
    img_192 = base_img.resize((192, 192), Image.Resampling.LANCZOS)
    img_512 = base_img.resize((512, 512), Image.Resampling.LANCZOS)
    
    img_16.save(os.path.join(frontend_dir, 'favicon-16x16.png'), 'PNG')
    img_32.save(os.path.join(frontend_dir, 'favicon-32x32.png'), 'PNG')
    img_180.save(os.path.join(frontend_dir, 'apple-touch-icon.png'), 'PNG')
    img_192.save(os.path.join(frontend_dir, 'android-chrome-192x192.png'), 'PNG')
    img_512.save(os.path.join(frontend_dir, 'android-chrome-512x512.png'), 'PNG')
    
    # Save multi-size favicon.ico
    base_img.save(
        os.path.join(frontend_dir, 'favicon.ico'),
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
    )
    
    # Also save svg
    svg_content = """<svg xmlns="http://www.svg.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="faviconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#8B5CF6" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="22" fill="#141417" />
  <path d="M25 72 L50 24 L75 72 M37 49 L63 49" stroke="url(#faviconGrad)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <circle cx="50" cy="24" r="7.5" fill="#8B5CF6" />
  <circle cx="25" cy="72" r="7.5" fill="#3b82f6" />
  <circle cx="75" cy="72" r="7.5" fill="#3b82f6" />
</svg>"""
    with open(os.path.join(frontend_dir, 'favicon.svg'), 'w', encoding='utf-8') as f:
        f.write(svg_content)
        
    print("Favicon files generated successfully in", frontend_dir)
