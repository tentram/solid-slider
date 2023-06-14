import { KeenSliderInstance } from "keen-slider";
/**
 * Adaptive height is a plugin that adjusts the height of the slider to the content on change.
 *
 * @example
 * ```ts
 * const [create] = createSlider({}, [adaptiveHeight]);
 * ```
 */
declare const adaptiveHeight: () => (slider: KeenSliderInstance) => void;
export default adaptiveHeight;
