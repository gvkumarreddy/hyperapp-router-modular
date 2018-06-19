import { h } from 'hyperapp';

export default initial => ({
  state: {
    joke: initial || '',
    fetching: false
  },
  actions: {
    fetchJoke: () => (state, actions) => {
      fetch('https://api.icndb.com/jokes/random?limitTo=[nerdy,explicit]')
        .then(data => data.json())
        .then(jokeData => actions.setJoke(jokeData.value.joke));
      return { fetching: true };
    },
    setJoke: value => state => ({ joke: value, fetching: false })
  },
  view: (state, actions) => ({
    CNJoke: () => (
      <div>
        <button class="button button-outline"
          onclick={() => actions.fetchJoke()}
          disabled={state.fetching}
        >
          {state.fetching ? 'Fetching Joke...' : 'Fetch Joke'}
        </button>
        <h2>{state.joke}</h2>
      </div>
    )
  })
});
