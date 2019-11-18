import { Sprite as PixiSprite, Texture as PixiTexture } from 'pixi.js';
import { PixiRendering } from './pixiRendering';

// NOTE: This is named SpriteRendering because "Sprite" name conflicts with pixi.js' Sprite and might be too confusing
export class SpriteRendering extends PixiRendering {
  /**
   * The PIXI.Sprite object.
   */
  public sprite: PixiSprite;

  /**
   * The color (in hex) to apply to the sprite.
   * Note: default is 0xffffff (white)
   */
  public get color(): number {
    return this.sprite.tint;
  }

  public set color(value: number) {
    this.sprite.tint = value;
  }

  /**
   * The transparency of the sprite (from 0 to 1);
   */
  public get alpha(): number {
    return this.sprite.alpha;
  }

  public set alpha(value: number) {
    this.sprite.alpha = value;
  }

  constructor(textureURL: string, color?: number, alpha?: number);
  constructor(texture: PixiTexture, color?: number, alpha?: number);
  constructor(sprite: PixiSprite, color?: number, alpha?: number);
  constructor(
    sprite: string | PixiSprite | PixiTexture,
    color = 0xffffff,
    alpha = 1
  ) {
    super();

    if (sprite instanceof PixiSprite) {
      this.sprite = sprite;
    } else {
      // TODO: Add (option to use) more optimized asset loader from pixi
      this.sprite = PixiSprite.from(sprite);
    }

    this.color = color;
    this.alpha = alpha;
  }
}
