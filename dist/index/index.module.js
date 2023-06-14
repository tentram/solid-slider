import { createSignal, onMount, onCleanup, createEffect, on, createContext, useContext } from 'solid-js';
import { access } from '@solid-primitives/utils';
import KeenSlider from 'keen-slider';
import { createComponent, isServer, insert, use, effect, className, classList, delegateEvents, template } from 'solid-js/web';

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
const createSlider = (options, ...plugins) => {
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
    ...overrides
  });
  const update = () => slider?.update(getOptions());
  // Slider creation method and directive function
  const create = newEl => {
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
  return [create, {
    current,
    next: () => slider && slider.next(),
    prev: () => slider && slider.prev(),
    details: () => slider ? slider.track.details : {},
    slider: () => slider,
    moveTo: (id, duration = 250, absolute = false, easing) => slider?.moveToIdx(id, absolute, {
      duration,
      easing: easing
    }),
    destroy,
    update
  }];
};

const _tmpl$ = /*#__PURE__*/template(`<div class="keen-slider">`),
  _tmpl$2 = /*#__PURE__*/template(`<button>`);

// The following is a hacky way of extracting SliderHelpers

function returnType(func) {
  return {};
}
// Main context for the slider
const SliderContext = createContext(createSignal(null));

/**
 * A helpful and simple Provider to wrap your Slider if controls such as SliderButton are used.
 *
 * @param props {KeenSliderOptions} options - Accepts all KeenSlider options.
 * @param props {KeenSLiderPlugin} plugins - A list of Solid Slider or Keen slider plugins.
 */
const SliderProvider = props => createComponent(SliderContext.Provider, {
  get value() {
    return createSignal(null);
  },
  get children() {
    return props.children;
  }
});

/**
 * Main Slider component for specifying the Slider on the page.
 *
 * @param props {KeenSliderOptions} options - Accepts all KeenSlider options.
 * @param props {KeenSLiderPlugin} plugins - A list of Solid Slider or Keen slider plugins.
 */
const Slider = props => {
  if (isServer) return (() => {
    const _el$ = _tmpl$();
    insert(_el$, () => props.children);
    return _el$;
  })();
  const [, setHelpers] = useContext(SliderContext);
  const [slider, helpers] = createSlider(props.options || {}, ...(props.plugins || []));
  setHelpers(helpers);
  createEffect(on(() => access(props.children), () => queueMicrotask(() => helpers.update()), {
    defer: true
  }));
  return (() => {
    const _el$2 = _tmpl$();
    use(slider, _el$2, () => true);
    insert(_el$2, () => props.children);
    return _el$2;
  })();
};

/**
 * Provides a helpful button with next/prev to pair with your slider.
 *
 * @param props {boolean} next - Specify if this should be a next button.
 * @param props {boolean} prev - Specify if this should be a prev button.
 * @param props {string} class - Class to override the button.
 * @param props {object} classList - List of classes to override the button.
 */
const SliderButton = props => {
  const context = useContext(SliderContext);
  const changeSlide = () => {
    if (context == null) return;
    const [helpers] = context;
    props.next ? helpers()?.next() : helpers()?.prev();
  };
  return (() => {
    const _el$3 = _tmpl$2();
    _el$3.$$click = changeSlide;
    insert(_el$3, () => props.children);
    effect(_p$ => {
      const _v$ = props.disabled || false,
        _v$2 = props.class,
        _v$3 = props.classList;
      _v$ !== _p$._v$ && (_el$3.disabled = _p$._v$ = _v$);
      _v$2 !== _p$._v$2 && className(_el$3, _p$._v$2 = _v$2);
      _p$._v$3 = classList(_el$3, _v$3, _p$._v$3);
      return _p$;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return _el$3;
  })();
};
delegateEvents(["click"]);

export { Slider, SliderButton, SliderContext, SliderProvider, createSlider, returnType };
//# sourceMappingURL=index.module.js.map
