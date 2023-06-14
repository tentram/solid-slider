import { on, onMount, createSignal, onCleanup, createEffect, } from "solid-js";
import { access } from "@solid-primitives/utils";
import KeenSlider from "keen-slider";
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
export const createSlider = (options, ...plugins) => {
    let slider;
    let el;
    const opts = () => access(options);
    const [current, setCurrent] = createSignal(opts()?.initial || 0);
    const destroy = () => slider && slider.destroy();
    const getOptions = (overrides = {}
    // @ts-ignore
    ) => ({
        selector: el.childNodes,
        ...opts(),
        ...overrides,
    });
    const update = () => slider?.update(getOptions());
    // Slider creation method and directive function
    const create = (newEl) => {
        el = newEl;
        el.classList.add("keen-slider");
        onMount(() => {
            slider = new KeenSlider(el, getOptions(), plugins);
            slider.on("slideChanged", () => setCurrent(slider.track.details.rel));
        });
        onCleanup(destroy);
        if (typeof options === "function") {
            createEffect(on(() => options, update));
        }
    };
    return [
        create,
        {
            current,
            next: () => slider && slider.next(),
            prev: () => slider && slider.prev(),
            details: () => (slider ? slider.track.details : {}),
            slider: () => slider,
            moveTo: (id, duration = 250, absolute = false, easing) => slider?.moveToIdx(id, absolute, { duration, easing: easing }),
            destroy,
            update,
        },
    ];
};
