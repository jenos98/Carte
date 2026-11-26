import os
import glob

# Mapping of emojis to FontAwesome icons
emoji_map = {
    '🎓': '<i class="fa-solid fa-graduation-cap"></i>',
    '🔐': '<i class="fa-solid fa-lock"></i>',
    '⏳': '<i class="fa-solid fa-hourglass-half"></i>',
    '🏛️': '<i class="fa-solid fa-building-columns"></i>',
    '🏫': '<i class="fa-solid fa-school"></i>',
    '📚': '<i class="fa-solid fa-book-open"></i>',
    '📋': '<i class="fa-solid fa-clipboard-list"></i>',
    '👤': '<i class="fa-solid fa-user"></i>',
    '📸': '<i class="fa-solid fa-camera"></i>',
    '📷': '<i class="fa-solid fa-camera-retro"></i>',
    '✅': '<i class="fa-solid fa-check"></i>',
    '✓': '<i class="fa-solid fa-check"></i>',
    '✗': '<i class="fa-solid fa-xmark"></i>',
    '🔍': '<i class="fa-solid fa-magnifying-glass"></i>',
    '⟳': '<i class="fa-solid fa-rotate fa-spin"></i>',
    '🎉': '<i class="fa-solid fa-check-circle"></i>',
    '📝': '<i class="fa-solid fa-file-signature"></i>',
    '🏠': '<i class="fa-solid fa-house"></i>',
    '📤': '<i class="fa-solid fa-paper-plane"></i>',
    '📊': '<i class="fa-solid fa-chart-simple"></i>',
    '👥': '<i class="fa-solid fa-users"></i>',
    '📈': '<i class="fa-solid fa-chart-line"></i>',
    '🚪': '<i class="fa-solid fa-arrow-right-from-bracket"></i>',
    '🪪': '<i class="fa-solid fa-id-card"></i>',
    '📌': '<i class="fa-solid fa-thumbtack"></i>',
    '⚡': '<i class="fa-solid fa-bolt"></i>',
    '👁': '<i class="fa-solid fa-eye"></i>',
    '⬇': '<i class="fa-solid fa-download"></i>',
    '📁': '<i class="fa-solid fa-folder-open"></i>',
    '📅': '<i class="fa-solid fa-calendar-days"></i>',
    '🗓': '<i class="fa-solid fa-calendar"></i>'
}

# The CDN link to add to the head if it's not there
fa_link = '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">\n'

html_files = glob.glob('pages/*.html')

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace emojis
    for emoji, icon in emoji_map.items():
        content = content.replace(emoji, icon)
    
    # Add FontAwesome CDN if not present
    if 'font-awesome' not in content:
        # Find the <title> tag to insert after it
        content = content.replace('</title>\n', '</title>\n' + fa_link)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Replacement complete.")
