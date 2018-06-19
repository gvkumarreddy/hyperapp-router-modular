import { h, app } from "hyperapp";
import { Link, Route, Switch, location } from "@hyperapp/router";
import counter from "./Counter";
import cnJoke from "./CNJoke";

const counterModule = counter(2);
const cnJokeModule = cnJoke();

const state = {
  location: location.state,
  counter: counterModule.state,
  cnJoke: cnJokeModule.state
};

const actions = {
  location: location.actions,
  counter: counterModule.actions,
  cnJoke: cnJokeModule.actions
};

const routes = [
  { path: "/", title: "Home" },
  { path: "/counter", title: "Counter" },
  { path: "/cnjoke", title: "Chuck Norris Joke" }
];

const Home = props => <h2>Home</h2>;
const Counter = views => (
  <div>
    <h2>Counter</h2>
    <views.Counter by={2} />
  </div>
);
const CNJoke = views => (
  <div>
    <h2>Chuck Norris Joke</h2>
    <views.CNJoke />
  </div>
);

const LinkView = ({ path, title, pathname }) => (
  <Link to={path}>
    <span class="button"
      style={{
        fontWeight: pathname === path ? "bold" : "normal"
      }}
    >
      {title}
    </span>
  </Link>
);

const MenuView = ({ pathname }) => (
  <ul class="row">
    {routes.map(route => (
      <li class="column">
        <LinkView path={route.path} title={route.title} pathname={pathname} />
      </li>
    ))}
  </ul>
);

const view = (state, actions) => {
  const views = {
    counter: counterModule.view(state.counter, actions.counter),
    cnJoke: cnJokeModule.view(state.cnJoke, actions.cnJoke)
  };
  return (
    <div>
      <MenuView pathname={state.location.pathname}></MenuView>
      <hr />

      <Switch>
        <Route path="/" location={state.location} render={Home} />
        <Route
          path="/counter"
          location={state.location}
          render={() => Counter(views.counter)}
        />
        <Route
          path="/cnjoke"
          location={state.location}
          render={() => CNJoke(views.cnJoke)}
        />
      </Switch>
    </div>
  );
};

export const App = app(state, actions, view, document.body);
location.subscribe(App.location);
