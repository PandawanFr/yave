import { Component } from '@trixt0r/ecs';
import PIXI from '../../lib/pixi';

export abstract class PixiRendering implements Component {
  /**
   * The underlying PIXI.Sprite object.
   */
  public abstract get sprite(): PIXI.Sprite;

  /**
   * Whether or not the sprite has been added to the renderingEngine.
   * (This prevents it from being added/rendered multiple times).
   */
  public addedToEngine = false;
}
