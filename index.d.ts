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
  destroy(): void;
  observe(el: HTMLElement): void;
  unobserve(el: HTMLElement): void;
}
export declare const cgAOS: { init(options?: CgOptions): CgInstance };
