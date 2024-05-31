import pyautogui
import random
import time
import math

def move_mouse_smoothly(target_x, target_y, duration):
    """
    Move the mouse to the given coordinates (target_x, target_y) smoothly.
    
    Args:
        target_x (int): The x-coordinate to move the mouse to.
        target_y (int): The y-coordinate to move the mouse to.
        duration (float): The duration over which the mouse movement will occur.
    """
    start_x, start_y = pyautogui.position()
    steps = 100  # Number of steps for smooth movement
    step_duration = duration / steps
    
    for i in range(steps):
        t = i / steps
        smooth_t = (math.sin((t - 0.5) * math.pi) + 1) / 2  # Smooth transition factor

        new_x = start_x + (target_x - start_x) * smooth_t
        new_y = start_y + (target_y - start_y) * smooth_t
        
        pyautogui.moveTo(new_x, new_y)
        time.sleep(step_duration)

    pyautogui.moveTo(target_x, target_y)

# Ask the user for the delay between movements
print("MS Teams Stay Online")
delay_duration = float(input("Enter the delay between each mouse move (in seconds): "))

print("Keeping you online...")
print("Press Ctrl+C to exit")

# Get the screen size
screen_width, screen_height = pyautogui.size()

while True:
    # Generate random target coordinates within the screen size
    target_x = random.randint(0, screen_width - 1)
    target_y = random.randint(0, screen_height - 1)

    # Define the total duration for the movement in seconds
    move_duration = random.uniform(0.5, 3)  # Randomize movement duration for each move

    # Move the mouse to the random target coordinates
    move_mouse_smoothly(target_x, target_y, move_duration)
    
    # Wait for the specified delay duration before the next move
    time.sleep(delay_duration)
