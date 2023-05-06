A simple adventure game by Akhror Rakhmatov based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: Garage,Cabin,Fork,Garage2.
- **2+ scenes *not* based on `AdventureScene`**: Intro and outro
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: startDrag/doDrag()- Adds the ability to drag objects
    - Enhancement 2: stopDrag()- Adds the ability to stop dragging objects
    - Ehancement 3: Changed slightly the font size of show message

Experience requirements:
- **4+ locations in the game world**: Garage,Cabin,Fork,Garage2.
- **2+ interactive objects in most scenes**: Keys, wheels, steering wheel, paint, turbo
- **Many objects have `pointerover` messages**: Every interactive object
- **Many objects have `pointerdown` effects**: Every interactive object
- **Some objects are themselves animated**: The r32 in fork scene moves around

Asset sources:
-Recorded audio in adobe audition for car sounds
-Edited all pixel art that had been sitting in my folders
-Took screenshot of gta 5 garage for first garage scene
- (For each image/audio/video asset used, describe how it was created. What tool did you use to create it? Was it based on another work? If so, how did you change it, and where can we learn more about the original work for comparison? Use [Markdown link syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links).)

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.