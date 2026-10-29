import os
from PIL import Image, ImageDraw, ImageFont

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

def draw_emblem(draw, scale, offset_x, offset_y):
    # Colors
    c_bright = hex_to_rgb('#3b82f6')
    c_deep = hex_to_rgb('#1d4ed8')
    
    # SVG points
    # P1 = top (45, 20)
    # P2 = bottom left (20, 70)
    # P3 = bottom right (70, 70)
    # P4 = crossbar left (32, 45)
    # P5 = crossbar right (58, 45)
    
    p1 = (offset_x + 45 * scale, offset_y + 20 * scale)
    p2 = (offset_x + 20 * scale, offset_y + 70 * scale)
    p3 = (offset_x + 70 * scale, offset_y + 70 * scale)
    p4 = (offset_x + 32 * scale, offset_y + 45 * scale)
    p5 = (offset_x + 58 * scale, offset_y + 45 * scale)
    
    stroke_w = 12 * scale
    radius = 8 * scale
    
    # Left leg: P2 to P1 (bright to deep)
    draw_gradient_line(draw, p2, p1, stroke_w, c_bright, c_deep)
    # Right leg: P1 to P3 (deep to bright)
    draw_gradient_line(draw, p1, p3, stroke_w, c_deep, c_bright)
    # Crossbar: P4 to P5
    t_cross_left = 0.5
    t_cross_right = 0.5
    c_cross_l = lerp_color(c_bright, c_deep, t_cross_left)
    c_cross_r = lerp_color(c_deep, c_bright, t_cross_right)
    draw_gradient_line(draw, p4, p5, stroke_w, c_cross_l, c_cross_r)
    
    # Vertex circles
    # Top vertex P1: deep blue
    draw.ellipse([p1[0] - radius, p1[1] - radius, p1[0] + radius, p1[1] + radius], fill=c_deep)
    # Bottom left P2: bright blue
    draw.ellipse([p2[0] - radius, p2[1] - radius, p2[0] + radius, p2[1] + radius], fill=c_bright)
    # Bottom right P3: bright blue
    draw.ellipse([p3[0] - radius, p3[1] - radius, p3[0] + radius, p3[1] + radius], fill=c_bright)

def make_icon_logo(out_300, out_1200):
    size = 1200
    # Background #141417
    img = Image.new('RGB', (size, size), hex_to_rgb('#141417'))
    draw = ImageDraw.Draw(img)
    
    scale = 13.0
    # center is around (45, 45) in svg
    offset_x = (size / 2.0) - (45.0 * scale)
    offset_y = (size / 2.0) - (45.0 * scale)
    
    draw_emblem(draw, scale, offset_x, offset_y)
    
    # Save 1200x1200
    img.save(out_1200, quality=95)
    # Downsample to 300x300
    img_300 = img.resize((300, 300), Image.Resampling.LANCZOS)
    img_300.save(out_300, quality=95)
    print(f"Created: {out_300}")

def make_brand_logo(out_300, out_1200):
    size = 1200
    img = Image.new('RGB', (size, size), hex_to_rgb('#141417'))
    draw = ImageDraw.Draw(img)
    
    scale = 8.2
    offset_x = (size / 2.0) - (45.0 * scale)
    offset_y = 120.0
    
    draw_emblem(draw, scale, offset_x, offset_y)
    
    # Text: "AGS Academy"
    font_path = 'C:/Windows/Fonts/segoeuib.ttf'
    font_main = ImageFont.truetype(font_path, 115)
    font_sub = ImageFont.truetype(font_path, 32)
    
    text_ags = "AGS "
    text_academy = "Academy"
    
    bbox_ags = draw.textbbox((0, 0), text_ags, font=font_main)
    bbox_acad = draw.textbbox((0, 0), text_academy, font=font_main)
    
    w_ags = bbox_ags[2] - bbox_ags[0]
    w_acad = bbox_acad[2] - bbox_acad[0]
    total_w = w_ags + w_acad
    
    start_x = (size - total_w) / 2.0
    text_y = 810.0
    
    # Draw "AGS" in White
    draw.text((start_x, text_y), text_ags, fill=hex_to_rgb('#FFFFFF'), font=font_main)
    # Draw "Academy" in Purple #7C3AED
    draw.text((start_x + w_ags, text_y), text_academy, fill=hex_to_rgb('#7C3AED'), font=font_main)
    
    # Subtitle
    sub_text = "TECH EDUCATION"
    bbox_sub = draw.textbbox((0, 0), sub_text, font=font_sub)
    w_sub = bbox_sub[2] - bbox_sub[0]
    sub_x = (size - w_sub) / 2.0
    draw.text((sub_x, 970.0), sub_text, fill=hex_to_rgb('#8B899A'), font=font_sub)
    
    img.save(out_1200, quality=95)
    img_300 = img.resize((300, 300), Image.Resampling.LANCZOS)
    img_300.save(out_300, quality=95)
    print(f"Created: {out_300}")

if __name__ == '__main__':
    dest_dir = r'c:\Users\gokul\OneDrive\Desktop\OneDrive\Desktop\E-learnwebsiteproject\google-login-node\frontend\logos'
    os.makedirs(dest_dir, exist_ok=True)
    
    make_icon_logo(
        os.path.join(dest_dir, 'ags_academy_logo_icon_300x300.png'),
        os.path.join(dest_dir, 'ags_academy_logo_icon_1200x1200.png')
    )
    make_brand_logo(
        os.path.join(dest_dir, 'ags_academy_logo_brand_300x300.png'),
        os.path.join(dest_dir, 'ags_academy_logo_brand_1200x1200.png')
    )
    print("ALL LOGOS GENERATED SUCCESSFULLY!")
