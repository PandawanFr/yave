import { Component } from '@trixt0r/ecs';
import { normalize, Vector } from '../../utils';

/**
 * Rotation Component to represent an entity's rotation in world space.
 */
export class Rotation extends Vector implements Component {
  /**
   * Rotation on the x axis (in degrees).
   */
  public declare x: number;
  /**
   * Rotation on the y axis (in degrees).
   */
  public declare y: number;
  /**
   * Rotation on the z axis (in degrees).
   */
  public declare z: number;

  /**
   * Pivot point to rotate around.
   */
  public pivot: Vector;

  /**
   * Access the rotation values in radians.
   * NOTE: Internally, all values are stored in degrees.
   */
  public get radians(): {
    // For some reason TS requires the docs here instead of on the object itself
    /**
     * Rotation on the x axis (in radians).
     */
    x: number;
    /**
     * Rotation on the y axis (in radians).
     */
    y: number;
    /**
     * Rotation on the x axis (in radians).
     */
    z: number;
  } {
    // Need to alias this because the {} object has its own this value
    /* eslint-disable-next-line @typescript-eslint/no-this-alias */
    const rotThis = this;
    return {
      /**
       * Rotation on the x axis (in radians).
       */
      get x(): number {
        return (rotThis.x * Math.PI) / 180;
      },
      set x(value: number) {
        const clampedValue = normalize(value, 0, 2 * Math.PI);
        rotThis.x = (clampedValue * 180) / Math.PI;
      },
      /**
       * Rotation on the y axis (in radians).
       */
      get y(): number {
        return (rotThis.y * Math.PI) / 180;
      },
      set y(value: number) {
        const clampedValue = normalize(value, 0, 2 * Math.PI);
        rotThis.y = (clampedValue * 180) / Math.PI;
      },
      /**
       * Rotation on the x axis (in radians).
       */
      get z(): number {
        return (rotThis.z * Math.PI) / 180;
      },
      set z(value: number) {
        const clampedValue = normalize(value, 0, 2 * Math.PI);
        rotThis.z = (clampedValue * 180) / Math.PI;
      },
    };
  }

  /**
   * Create a rotation component with default values of 0.
   */
  constructor();
  /**
   * Create a 2D rotation component with one rotation angle.
   * @param angle Rotation on the z axis (in degrees).
   */
  constructor(angle: number);
  /**
   * Create a 3D rotation component.
   * @param x Rotation on the x axis (in degrees).
   * @param y Rotation on the y axis (in degrees).
   * @param z Rotation on the z axis (in degrees).
   */
  constructor(x: number, y: number, z: number);
  /**
   * Create a rotation component from the given vector.
   * @param vector Rotation vector (in degrees).
   */
  constructor(vector: Vector);
  constructor(x?: number | Vector, y?: number, z?: number) {
    // If a vector is passed, reassign x, y, z to the vector values
    if (x instanceof Vector) {
      const vec = x;
      x = vec.x;
      z = vec.z;
      y = vec.y;
    }

    // If only one rotation is passed, assume this is a 2D rotation (aka rotation around Z axis)
    if (x !== undefined && y === undefined && z === undefined) {
      super(0, 0, normalize(x, 0, 360));
    }
    // Otherwise, just use the passed parameters
    // this allows edge cases like Rotation(undefined, 0, 0) to work.
    else {
      super(
        normalize(x ?? 0, 0, 360),
        normalize(y ?? 0, 0, 360),
        normalize(z ?? 0, 0, 360)
      );
    }

    // Set default pivot point in the middle
    this.pivot = new Vector(0, 0, 0);
  }

  public set(angle: number): Rotation;
  public set(x: number, y: number, z: number): Rotation;
  public set(x: number, y?: number, z?: number): Rotation {
    if (x !== undefined && y === undefined && z === undefined) {
      this.x = 0;
      this.y = 0;
      this.z = normalize(x ?? 0, 0, 360);
    } else {
      this.x = normalize(x ?? 0, 0, 360);
      this.y = normalize(y ?? 0, 0, 360);
      this.z = normalize(z ?? 0, 0, 360);
    }
    return this;
  }

  public add(other: Rotation): Rotation {
    this.x += normalize(other.x ?? 0, 0, 360);
    this.y += normalize(other.y ?? 0, 0, 360);
    this.z += normalize(other.z ?? 0, 0, 360);
    return this;
  }

  /**
   * Create a 2D rotation component with one rotation angle.
   * NOTE: Converting from radians to degrees might result in floating point errors.
   * @param angle Rotation on the z axis (in radians).
   */
  public static fromRadians(angle: number): Rotation;
  /**
   * Create a Rotation component from the given radian values.
   *
   * NOTE: Converting from radians to degrees might result in floating point errors.
   * @param x Rotation on the x axis (in radians).
   * @param y Rotation on the y axis (in radians).
   * @param z Rotation on the z axis (in radians).
   */
  public static fromRadians(x: number, y: number, z: number): Rotation;
  /**
   * Create a rotation component from the given vector.
   * NOTE: Converting from radians to degrees might result in floating point errors.
   * @param vector Rotation vector (in radians).
   */
  public static fromRadians(vector: Vector): Rotation;
  public static fromRadians(
    x: number | Vector,
    y?: number,
    z?: number
  ): Rotation {
    // If a vector is passed, reassign x, y, z to the vector values
    if (x instanceof Vector) {
      const vec = x;
      x = vec.x;
      z = vec.z;
      y = vec.y;
    }

    const clampedX = normalize(x, 0, 2 * Math.PI);
    const clampedY = y !== undefined ? normalize(y, 0, 2 * Math.PI) : undefined;
    const clampedZ = z !== undefined ? normalize(z, 0, 2 * Math.PI) : undefined;

    if (clampedY === undefined && clampedZ === undefined) {
      return new Rotation((clampedX * 180) / Math.PI);
    }

    return new Rotation(
      (clampedX * 180) / Math.PI,
      ((clampedY ?? 0) * 180) / Math.PI,
      ((clampedZ ?? 0) * 180) / Math.PI
    );
  }
}
