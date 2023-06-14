import { FlowComponent } from "solid-js";
import { KeenSliderOptions, KeenSliderPlugin } from "keen-slider";
interface Func<T> {
    ([...args]: any, args2?: any): T;
}
export declare function returnType<T>(func: Func<T>): T;
export declare const SliderContext: import("solid-js").Context<import("solid-js").Signal<{
    current: import("solid-js").Accessor<number>;
    next: import("solid-js").Accessor<void>;
    prev: import("solid-js").Accessor<void>;
    moveTo: (id: number, duration?: number, absolute?: boolean, easing?: (t: number) => number) => void;
    details: import("solid-js").Accessor<import("keen-slider").TrackDetails>;
    slider: import("solid-js").Accessor<import("keen-slider").KeenSliderInstance<{}, {}, import("keen-slider").KeenSliderHooks>>;
    destroy: import("solid-js").Accessor<void>;
    update: VoidFunction;
}>>;
/**
 * A helpful and simple Provider to wrap your Slider if controls such as SliderButton are used.
 *
 * @param props {KeenSliderOptions} options - Accepts all KeenSlider options.
 * @param props {KeenSLiderPlugin} plugins - A list of Solid Slider or Keen slider plugins.
 */
export declare const SliderProvider: FlowComponent;
/**
 * Main Slider component for specifying the Slider on the page.
 *
 * @param props {KeenSliderOptions} options - Accepts all KeenSlider options.
 * @param props {KeenSLiderPlugin} plugins - A list of Solid Slider or Keen slider plugins.
 */
export declare const Slider: FlowComponent<{
    options?: KeenSliderOptions;
    plugins?: KeenSliderPlugin[];
}>;
/**
 * Provides a helpful button with next/prev to pair with your slider.
 *
 * @param props {boolean} next - Specify if this should be a next button.
 * @param props {boolean} prev - Specify if this should be a prev button.
 * @param props {string} class - Class to override the button.
 * @param props {object} classList - List of classes to override the button.
 */
export declare const SliderButton: FlowComponent<{
    next?: boolean;
    prev?: boolean;
    disabled?: boolean;
    class?: string;
    classList?: {
        [k: string]: boolean | undefined;
    };
}>;
export {};
