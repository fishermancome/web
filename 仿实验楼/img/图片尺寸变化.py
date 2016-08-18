from PIL import Image

im=Image.open('12.jpg')
im.thumbnail((220,220))
im.save('12.png','png')
