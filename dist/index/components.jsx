import { on, createContext, useContext, createSignal, createEffect, } from "solid-js";
import { createSlider } from "./primitive";
import { access } from "@solid-primitives/utils";
import { isServer } from "solid-js/web";
export function returnType(func) {
    return {};
}
const sliderValues = returnType(createSlider);
// Main context for the slider
export const SliderContext = createContext(createSignal(null));
/**
 * A helpful and simple Provider to wrap your Slider if controls such as SliderButton are used.
 *
 * @param props {KeenSliderOptions} options - Accepts all KeenSlider options.
 * @param props {KeenSLiderPlugin} plugins - A list of Solid Slider or Keen slider plugins.
 */
export const SliderProvider = (props) => (<SliderContext.Provider value={createSignal(null)}>
    {props.children}
  </SliderContext.Provider>);
/**
 * Main Slider component for specifying the Slider on the page.
 *
 * @param props {KeenSliderOptions} options - Accepts all KeenSlider options.
 * @param props {KeenSLiderPlugin} plugins - A list of Solid Slider or Keen slider plugins.
 */
export const Slider = (props) => {
    if (isServer)
        return <div class="keen-slider">{props.children}</div>;
    const [, setHelpers] = useContext(SliderContext);
    const [slider, helpers] = createSlider(props.options || {}, ...(props.plugins || []));
    setHelpers(helpers);
    createEffect(on(() => access(props.children), () => queueMicrotask(() => helpers.update()), { defer: true }));
    slider;
    return (<div use:slider class="keen-slider">
      {props.children}
    </div>);
};
/**
 * Provides a helpful button with next/prev to pair with your slider.
 *
 * @param props {boolean} next - Specify if this should be a next button.
 * @param props {boolean} prev - Specify if this should be a prev button.
 * @param props {string} class - Class to override the button.
 * @param props {object} classList - List of classes to override the button.
 */
export const SliderButton = (props) => {
    const context = useContext(SliderContext);
    const changeSlide = () => {
        if (context == null)
            return;
        const [helpers] = context;
        props.next ? helpers()?.next() : helpers()?.prev();
    };
    return (<button disabled={props.disabled || false} class={props.class} classList={props.classList} onClick={changeSlide}>
      {props.children}
    </button>);
};
