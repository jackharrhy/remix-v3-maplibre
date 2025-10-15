October 13th:

I'm going to write random thoughts in my head into this file as I'm using this, both for my own interest, but maybe for the folks building this stuff as well.

A route handler being `() => render(...)` is nice, but I wanted to just remove uses from the existing `{ uses: [], handler: () => {} }`, to make it `{ handler: () => {} }`, and that wasn't valid TS / error'd out the backend when I visited the route.

I noticed in the demo code, there was both 'fragments', and also hydrated components, at the moment I'm honestly not 200% sure the difference between them, and what a `<Frame />` is and such, I did just tear out a bunch of code... my guess is that the hydrated component isn't going to be rendered on the server at _all_? Which doesn't seem to be the case! It looks like it is being ran once on the server and sent over the wire with the `/rmx:...` directives, cool! At least from my perspective it seems like I'm just going to be using this stuff for my demo, lets see if I actually use Frames...

I'm currently setting up [maplibre](https://maplibre.org/maplibre-gl-js/docs/), the very first bump I've felt, is I tried to slap a new maplibre instance in the body scope of the function, but because it runs on the server, I'm getting a 'document not found', I'm going to do a `if (globalThis.window)` check, which I assume will be fine.

That didn't work! Maplibre expects to have a DOM node either passed directly, or by string reference to a div or something with an ID, but I remembered from Ryan's talk that `connect` was an event I can listen on, so I'm going to set it up in that now, which also means no `globalThis` check, I think events are a good place for the above anyways, which makes sense, rather than ugly globalThis checks, it does feel like my favourite usage of useEffects in Remix, having client-only code.

OK I did that, just as the code on Kent's posting of the demos from the disc... but no dice! Will see if I'm doing something silly...

It seems that the `press` event works, my guess maybe is that `connect` works on things that are components and not DOM nodes? Like 'components', it does seem like that would make sense, and each example of 'connect' in the disc demos _is_ on a component.

I've now got a `Example.tsx` I've taken a screenshot of, and will likely just `@` Ryan with on Twitter, lets see if I'm just being stupid or this is a known/_unknown_ gap.

_Some time later_

So [Ryan got back to me](https://x.com/ryanflorence/status/1977872624278786498):

> there are way more bugs than features right now, don't try to use any of the frontend stuff in earnest

So, I parked working on this, until the next day...

October 14th:

I noticed Kent had posted [this on Twitter](https://x.com/kentcdodds/status/1978219213904044051), his talk at Remix Jam was on MCP UI, and I could tell sitting [_literally next to him_](https://youtu.be/xt_iEOn2a6Y?t=12473) during the Remix v3 section of the day, he was _interested in it_, and yeah, he went and [_built_](https://github.com/kentcdodds/cloudflare-remix-vite-mcp/).

It seems in this example its using serverside stuff, but only to render a shell, with similar utilities to serving a frontend bundle as I already have, but not for an 'entrypoint' to be hydrated, but for a clientside Remix application to be initialzied into a div.

This is... what React SPAs are like, I mean at this point you don't _need_ the server piece and could just have a index.html handled by Vite, but I don't want to lose all of the cool serverside stuff _yet_ even though I think this will all be very clientside, so I've done the same thing, and boom, the component I wrote works without any real changes, the `connect` API works just fine when not doing the hydration step!, next to figure out how to get Maplibre's CSS in so it looks proper.
