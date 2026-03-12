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
      { name: "Fremont Hills", address: "12889 Viscaino Pl, Los Altos Hills, CA 94022" },
      { name: "Grant Park", address: "1575 Holt Ave, Los Altos, CA 94024" },
      { name: "Fabian", address: "1575 Holt Ave, Los Altos, CA 94024" },
      { name: "Chase Center", address: "1 Warriors Way, San Francisco, CA 94158" },
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
    group: "Doctors",
    places: [
      { name: "Encina", address: "49 Wells Avenue, 3rd Floor, Palo Alto, CA 94301" },
      { name: "Smilecraft", address: "787 E El Camino Real, Sunnyvale, CA 94087" },
      { name: "Pediatrician", address: "842 Altos Oaks Dr, Los Altos, CA 94024" },
      { name: "Kids' Dentist", address: "1704 Miramonte Ave #9, Mountain View, CA 94040" },
      { name: "Urgent Care MTV", address: "701 E El Camino Real 2nd floor, Mountain View, CA 94040" },
    ],
  },
  {
    group: "Friends",
    places: [
      { name: "Emily", address: "288 Liebre Ct, Sunnyvale, CA 94086" },
      { name: "Roopa", address: "1586 Holt Ave, Los Altos, CA 94024" },
      { name: "Sugandh", address: "435 Casita Way, Los Altos, CA 94022" },
      { name: "Sandler", address: "412 Covington Rd, Los Altos, CA 94024" },
    ],
  },
];

const icons = {
  Homes: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  `,
  Schools: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M4.5 5.5h8a3 3 0 0 1 3 3v10h-8a3 3 0 0 0-3 3z" />
      <path d="M19.5 5.5h-8a3 3 0 0 0-3 3v10h8a3 3 0 0 1 3 3z" />
    </svg>
  `,
  Sports: `
    <svg viewBox="0 0 24 24" focusable="false">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5a14 14 0 0 1 0 17" />
      <path d="M12 3.5a14 14 0 0 0 0 17" />
      <path d="M5.5 7.5c2.2 1.4 4.4 2.1 6.5 2.1s4.3-.7 6.5-2.1" />
      <path d="M5.5 16.5c2.2-1.4 4.4-2.1 6.5-2.1s4.3.7 6.5 2.1" />
    </svg>
  `,
  Stores: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M7 8V7a5 5 0 0 1 10 0v1" />
      <path d="M5.5 8.5h13l-1 11h-11z" />
      <path d="M9.5 11.5a2.5 2.5 0 0 0 5 0" />
    </svg>
  `,
  Doctors: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M12 4.5v15" />
      <path d="M4.5 12h15" />
      <path d="M6.5 4.5h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2z" />
    </svg>
  `,
  Friends: `
    <svg viewBox="0 0 24 24" focusable="false">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </svg>
  `,
};

const groupsContainer = document.querySelector("#groups");
const groupTemplate = document.querySelector("#group-template");
const buttonTemplate = document.querySelector("#button-template");

const buildAppleMapsUrl = (destination) =>
  `https://maps.apple.com/?daddr=${encodeURIComponent(destination)}&dirflg=d`;

const toggleGroup = (section, button) => {
  const isCollapsed = section.classList.toggle("is-collapsed");
  section.classList.toggle("is-open", !isCollapsed);
  button.setAttribute("aria-expanded", String(!isCollapsed));
};

destinations.forEach(({ group, places }) => {
  const groupFragment = groupTemplate.content.cloneNode(true);
  const section = groupFragment.querySelector(".group");
  const toggle = groupFragment.querySelector(".group-toggle");
  const title = groupFragment.querySelector(".group-title");
  const groupIcon = groupFragment.querySelector(".group-icon");
  const grid = groupFragment.querySelector(".button-grid");

  title.textContent = group;
  groupIcon.innerHTML = icons[group] || "";
  toggle.setAttribute("aria-label", `Toggle ${group} destinations`);

  toggle.addEventListener("click", () => toggleGroup(section, toggle));

  places.forEach(({ name, address }) => {
    const buttonFragment = buttonTemplate.content.cloneNode(true);
    const link = buttonFragment.querySelector(".destination-button");
    const icon = buttonFragment.querySelector(".destination-icon");
    const nameText = buttonFragment.querySelector(".destination-name");

    nameText.textContent = name;
    icon.innerHTML = icons[group] || "";
    link.href = buildAppleMapsUrl(address);
    link.setAttribute("aria-label", `Open Apple Maps directions to ${name}`);

    grid.appendChild(buttonFragment);
  });

  groupsContainer.appendChild(groupFragment);
});
