import { Accessor } from "solid-js";
import { KeenSliderHooks, KeenSliderInstance, KeenSliderOptions, KeenSliderPlugin, TrackDetails } from "keen-slider";
declare module "solid-js" {
    namespace JSX {
        interface Directives {
            slider: {};
        }
    }
}
/**
 * Creates a slider powered by KeenSlider.
 *
 * @param {Object} options Values to initialize the slider with
 * @param {Array} plugins Extensions that enhance KeenSlider options
 * @returns {[create: Function, helpers: Object]} Returns mount and helper methods
 * @returns {Function} create Mounts the slider on provided element
 * @returns {Function} helpers.current Current slide number
 * @returns {Function} helpers.current Current slide number
 * @returns {Function} helpers.next Function to trigger the next slide
 * @returns {Function} helpers.prev Function to trigger the previous slide
 * @returns {Function<Object>} helpers.details Provides details about the current slider
 * @returns {Function} helpers.slider Returns the KeenSlider instance
 * @returns {Function} helpers.destroy Manual destroy function
 *
 * @example
 * ```ts
 * const [create, { prev, next }] = createSlider();
 * <div use:slider>...</div>
 * ```
 */
export declare const createSlider: <O = {}, P = {}, H extends string = KeenSliderHooks>(options?: KeenSliderOptions<O, P, H> | Accessor<KeenSliderOptions<O, P, H>>, ...plugins: KeenSliderPlugin<O, P, H>[]) => [create: (el: HTMLElement) => void, helpers: {
    current: Accessor<number>;
    next: Accessor<void>;
    prev: Accessor<void>;
    moveTo: (id: number, duration?: number, absolute?: boolean, easing?: (t: number) => number) => void;
    details: Accessor<TrackDetails>;
    slider: Accessor<KeenSliderInstance<O, P, H>>;
    destroy: Accessor<void>;
    update: VoidFunction;
}];
