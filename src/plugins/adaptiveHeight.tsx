import { Accessor, createEffect } from "solid-js";
import { makeTimer } from "@solid-primitives/timer";
import { KeenSliderInstance } from "keen-slider";

/**
 * Adaptive height is a plugin that adjusts the height of the slider to the content on change.
 *
 * @example
 * ```ts
 * const [create] = createSlider({}, [adaptiveHeight]);
 * ```
 */
const adaptiveHeight = () => {
  return (slider: KeenSliderInstance) => {
    function updateHeight() {
      slider.container.style.height = slider.slides[slider.track.details.rel].offsetHeight + "px";
    }
    slider.on("created", updateHeight);
    slider.on("slideChanged", updateHeight);
  };
};

export default adaptiveHeight;
