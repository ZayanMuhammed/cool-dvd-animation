from PIL import Image

# Open an image
try:
    img = Image.open('./1.png')
except FileNotFoundError:
    print("Error: 'input_image.jpg' not found. Please ensure the image exists.")
    exit()

new_size = (185, 115)

resized_img = img.resize(new_size, Image.LANCZOS)

resized_img.save('1.png')

print(f"Image resized to {new_size[0]}x{new_size[1]} and saved as 'output_image_resized.jpg'")