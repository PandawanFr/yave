# yave

Yet Another Voxel Engine (written in TS).

## Goals

- Simple but powerful true [ECS (Entity-Component-Systems)](https://en.wikipedia.org/wiki/Entity_component_system) where components and systems are not coupled (unlike in Unity's current EC-system)
- Has all the basics to start making your own game, but is modular so you can replace things with your own systems
- Self-documenting code (along with generated docs) so you (almost) never have to meddle with the engine itself
- Uses modern ES standards for cleaner and fully-typed code
- Compiles to relatively new ES standards, I'm tired of supporting older browsers/versions
- Not restricted to working with voxels (I know it's in the name, but I want to support both 2D & 3D)

## TODO

- Add more options & more advanced rendering components & systems
- Add position-fixing when resizing window (so that the center of the view remains the same after resizing).
- Replace all "intentional undefined"s to null
- Add assemblages
- Create docs

## Research

### ECS

- [ECS-TS by Trixt0r](https://github.com/Trixt0r/ecsts): Perhaps the best ECS system I've ever seen (although needs a bit of doc & typing corrections)
- [Nova Engine by holywyvern](https://github.com/nova-engine/ecs): Interesting TypeScript ECS System (with Family system) but somewhat lacking in docs
- [Blog Post by Stefan Valentin](http://ripplega.me/development/ecs-ez/) with great insight on extra features like assemblages

### Game Loop

- [Anatomy of a Game on MDN](https://developer.mozilla.org/en-US/docs/Games/Anatomy): A great example on how to write a JS game engine loop
- [GameLoop by sethvincent](https://github.com/sethvincent/gameloop/blob/master/index.js): Implementation of game loop for inspiration
