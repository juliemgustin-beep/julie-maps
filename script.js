const WORKER_BASE_URL = "https://julies-map-redirects.julie-m-gustin.workers.dev";

const destinations = [
  {
    group: "Homes",
    places: [
      { key: "home", name: "Home" },
      { key: "tahoe", name: "Tahoe" },
      { key: "mom", name: "Mom" },
      { key: "eddie", name: "Eddie" },
    ],
  },
  {
    group: "Schools",
    places: [
      { key: "lower", name: "Lower" },
      { key: "middle", name: "Middle" },
      { key: "upper", name: "Upper" },
      { key: "school-fabian", name: "Fabian" },
    ],
  },
  {
    group: "Sports",
    places: [
      { key: "fremont-hills", name: "Fremont Hills" },
      { key: "grant-park", name: "Grant Park" },
      { key: "sports-fabian", name: "Fabian" },
      { key: "chase-center", name: "Chase Center" },
    ],
  },
  {
    group: "Stores",
    places: [
      { key: "trader-joes", name: "Trader Joes" },
      { key: "target", name: "Target" },
      { key: "costco", name: "Costco" },
      { key: "stanford-mall", name: "Stanford Mall" },
      { key: "downtown-los-altos", name: "Downtown Los Altos" },
    ],
  },
  {
    group: "Doctors",
    places: [
      { key: "encina", name: "Encina" },
      { key: "smilecraft", name: "Smilecraft" },
      { key: "pediatrician", name: "Pediatrician" },
      { key: "kids-dentist", name: "Kids' Dentist" },
      { key: "urgent-care-mtv", name: "Urgent Care MTV" },
    ],
  },
  {
    group: "Friends",
    places: [
      { key: "emily", name: "Emily" },
      { key: "roopa", name: "Roopa" },
      { key: "sugandh", name: "Sugandh" },
      { key: "sandler", name: "Sandler" },
    ],
  },
];

const categoryStyles = {
  Homes: { icon: "home", accent: "#2f73d9", soft: "#eaf2ff" },
  Schools: { icon: "school", accent: "#4d8b73", soft: "#edf6f1" },
  Sports: { icon: "basketball", accent: "#e06d3c", soft: "#fff1eb" },
  Stores: { icon: "bag", accent: "#6760b6", soft: "#f0efff" },
  Doctors: { icon: "stethoscope", accent: "#d0526e", soft: "#fff0f4" },
  Friends: { icon: "person", accent: "#2785a7", soft: "#ebf7fb" },
};

const destinationIconOverrides = {
  "fremont-hills": "golf",
  "grant-park": "soccer",
  "sports-fabian": "field",
  "chase-center": "basketball",
};

const icons = {
  home: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M3.5 10.5 12 3.5l8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  `,
  school: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M4.5 6.5h7.4a3 3 0 0 1 3 3V20h-7.4a3 3 0 0 0-3 3z" />
      <path d="M19.5 6.5h-7.4a3 3 0 0 0-3 3V20h7.4a3 3 0 0 1 3 3z" />
    </svg>
  `,
  basketball: `
    <svg viewBox="0 0 24 24" focusable="false">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5a14 14 0 0 1 0 17" />
      <path d="M12 3.5a14 14 0 0 0 0 17" />
      <path d="M5.5 7.6c2.1 1.4 4.3 2.1 6.5 2.1s4.4-.7 6.5-2.1" />
      <path d="M5.5 16.4c2.1-1.4 4.3-2.1 6.5-2.1s4.4.7 6.5 2.1" />
    </svg>
  `,
  bag: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M7 8V7a5 5 0 0 1 10 0v1" />
      <path d="M5.5 8.5h13l-1 11h-11z" />
      <path d="M9.5 11.7a2.5 2.5 0 0 0 5 0" />
    </svg>
  `,
  stethoscope: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M6.5 4.5v5.2a4.5 4.5 0 0 0 9 0V4.5" />
      <path d="M6.5 4.5H5" />
      <path d="M15.5 4.5H17" />
      <path d="M11 14.2v1.6a4.7 4.7 0 0 0 9.4 0v-1.1" />
      <circle cx="20.4" cy="12.7" r="1.7" />
    </svg>
  `,
  person: `
    <svg viewBox="0 0 24 24" focusable="false">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </svg>
  `,
  golf: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M7 20h10" />
      <path d="M12 20V4" />
      <path d="M12 4h6l-1.6 2L18 8h-6" />
      <path d="M8 17c1.1-.7 2.4-1 4-1s2.9.3 4 1" />
    </svg>
  `,
  soccer: `
    <svg viewBox="0 0 24 24" focusable="false">
      <circle cx="12" cy="12" r="8.5" />
      <path d="m12 7 4 3-1.5 4.6h-5L8 10z" />
      <path d="m8 10-3 .8" />
      <path d="m16 10 3 .8" />
      <path d="m9.5 14.6-1.8 2.7" />
      <path d="m14.5 14.6 1.8 2.7" />
    </svg>
  `,
  field: `
    <svg viewBox="0 0 24 24" focusable="false">
      <path d="M4.5 6.5h15v11h-15z" />
      <path d="M12 6.5v11" />
      <path d="M4.5 12h4" />
      <path d="M15.5 12h4" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  `,
};

const groupsContainer = document.querySelector("#groups");
const groupTemplate = document.querySelector("#group-template");
const buttonTemplate = document.querySelector("#button-template");

const buildWorkerUrl = (key) => {
  const path = `/go/${encodeURIComponent(key)}`;
  return WORKER_BASE_URL ? `${WORKER_BASE_URL.replace(/\/$/, "")}${path}` : path;
};

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
  const category = categoryStyles[group] || categoryStyles.Homes;

  section.style.setProperty("--category-accent", category.accent);
  section.style.setProperty("--category-soft", category.soft);
  title.textContent = group;
  groupIcon.innerHTML = icons[category.icon] || "";
  toggle.setAttribute("aria-label", `Toggle ${group} destinations`);

  toggle.addEventListener("click", () => toggleGroup(section, toggle));

  places.forEach(({ key, name }) => {
    const buttonFragment = buttonTemplate.content.cloneNode(true);
    const link = buttonFragment.querySelector(".destination-button");
    const icon = buttonFragment.querySelector(".destination-icon");
    const nameText = buttonFragment.querySelector(".destination-name");
    const iconName = destinationIconOverrides[key] || category.icon;

    nameText.textContent = name;
    icon.innerHTML = icons[iconName] || icons[category.icon] || "";
    link.href = buildWorkerUrl(key);
    link.setAttribute("aria-label", `Open Apple Maps directions to ${name}`);
    link.classList.add("destination-button--single-line");

    grid.appendChild(buttonFragment);
  });

  groupsContainer.appendChild(groupFragment);
});
