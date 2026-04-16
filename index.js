const APPLE_MAPS_URL = "https://maps.apple.com/";

const jsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const parseDestinations = (env) => {
  if (!env.DESTINATIONS_JSON) {
    throw new Error("DESTINATIONS_JSON secret is missing.");
  }

  const destinations = JSON.parse(env.DESTINATIONS_JSON);

  if (!destinations || typeof destinations !== "object" || Array.isArray(destinations)) {
    throw new Error("DESTINATIONS_JSON must be a JSON object keyed by destination key.");
  }

  return destinations;
};

const getDestinationKey = (pathname) => {
  const match = pathname.match(/^\/go\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]).toLowerCase() : null;
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return jsonResponse({ ok: true });
    }

    const key = getDestinationKey(url.pathname);

    if (!key) {
      return jsonResponse({ error: "Use /go/<destination-key>." }, 404);
    }

    let destinations;
    try {
      destinations = parseDestinations(env);
    } catch (error) {
      return jsonResponse({ error: error.message }, 500);
    }

    const address = destinations[key];

    if (typeof address !== "string" || !address.trim()) {
      return jsonResponse({ error: `Unknown destination: ${key}` }, 404);
    }

    const mapsUrl = new URL(APPLE_MAPS_URL);
    mapsUrl.searchParams.set("daddr", address.trim());
    mapsUrl.searchParams.set("dirflg", "d");

    return Response.redirect(mapsUrl.toString(), 302);
  },
};
