const destinations = [
  {
    group: "Homes",
    places: [
      { name: "Home", address: "1141 Payne Drive, Los Altos, CA 94024" },
      { name: "Tahoe", address: "497 Tahoe Keys Blvd, South Lake Tahoe, CA 96150" },
      { name: "Mom", address: "19626 Vineyard Ln, Saratoga, CA 95070" },
      { name: "Eddie", address: "1612 Duvall Dr, San Jose, CA 95130" },
    ],
  },
  {
    group: "Schools",
    places: [
      { name: "Lower", address: "477 Fremont Ave, Los Altos, CA 94024" },
      { name: "Middle", address: "327 Fremont Ave, Los Altos, CA 94024" },
      { name: "Upper", address: "26800 Fremont Rd, Los Altos Hills, CA 94022" },
      { name: "Fabian", address: "3750 Fabian Way, Palo Alto, CA 94303" },
    ],
  },
  {
    group: "Sports",
    places: [
      { name: "Fremont Hills Club", address: "12889 Viscaino Pl, Los Altos Hills, CA 94022" },
      { name: "Grant Park", address: "1575 Holt Ave, Los Altos, CA 94024" },
      { name: "Fabian", address: "1575 Holt Ave, Los Altos, CA 94024" },
    ],
  },
  {
    group: "Stores",
    places: [
      { name: "Trader Joes", address: "2310 Homestead Rd, Los Altos, CA 94024" },
      { name: "Target", address: "555 Showers Dr, Mountain View, CA 94040" },
      { name: "Costco", address: "1000 N Rengstorff Ave #143c, Mountain View, CA 94043" },
      { name: "Stanford Mall", address: "660 Stanford Shopping Center, Palo Alto, CA 94304" },
      { name: "Downtown Los Altos", address: "288 1st St, Los Altos, CA 94022" },
    ],
  },
  {
    group: "Friends",
    places: [
      { name: "Emily", address: "288 Liebre Ct, Sunnyvale, CA 94086" },
      { name: "Roopa", address: "1586 Holt Ave, Los Altos, CA 94024" },
    ],
  },
];

const groupsContainer = document.querySelector("#groups");
const groupTemplate = document.querySelector("#group-template");
const buttonTemplate = document.querySelector("#button-template");

const buildAppleMapsUrl = (destination) =>
  `https://maps.apple.com/?daddr=${encodeURIComponent(destination)}&dirflg=d`;

destinations.forEach(({ group, places }) => {
  const groupFragment = groupTemplate.content.cloneNode(true);
  const title = groupFragment.querySelector("h2");
  const grid = groupFragment.querySelector(".button-grid");

  title.textContent = group;

  places.forEach(({ name, address }) => {
    const buttonFragment = buttonTemplate.content.cloneNode(true);
    const link = buttonFragment.querySelector(".destination-button");
    const nameText = buttonFragment.querySelector(".destination-name");
    const addressText = buttonFragment.querySelector(".destination-address");

    nameText.textContent = name;
    addressText.textContent = address;
    link.href = buildAppleMapsUrl(address);
    link.setAttribute("aria-label", `Open Apple Maps directions to ${name}`);

    grid.appendChild(buttonFragment);
  });

  groupsContainer.appendChild(groupFragment);
});
