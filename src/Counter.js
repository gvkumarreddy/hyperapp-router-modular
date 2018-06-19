import { h } from 'hyperapp';

export default initial => ({
  state: {
    value: initial
  },
  actions: {
    increment: by => state => ({ value: state.value + by }),
    decrement: by => state => ({
      value: state.value > 0 ? state.value - by : state.value
    })
  },
  view: (state, actions) => ({
    Counter: ({ by }) => (
      <div>
        <button onclick={() => actions.decrement(by || 1)} disabled={state.value <= 0}>-</button>
        <span> {state.value} </span>
        <button onclick={() => actions.increment(by || 1)}>+</button>
      </div>
    )
  })
});
