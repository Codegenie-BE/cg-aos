// index.d.ts

export interface CgOptions {
  selector?: string;
  once?: boolean;
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  autoObserve?: boolean;
  reducedMotion?: 'skip' | 'instant' | 'none';
}

export interface CgInstance {
  /**
   * Disconnect all observers and clean up.
   */
  destroy(): void;

  /**
   * Manually observe a new element.
   */
  observe(el: HTMLElement): void;

  /**
   * Stop observing a specific element.
   */
  unobserve(el: HTMLElement): void;
}

/**
 * Main entry for cg-aos.
 */
export declare const cgAOS: {
  /**
   * Initialize cg-aos on elements matching selector.
   */
  init(options?: CgOptions): CgInstance;
};
