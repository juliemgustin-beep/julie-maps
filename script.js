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

  title.textContent = group;
  groupIcon.innerHTML = icons[group] || "";
  toggle.setAttribute("aria-label", `Toggle ${group} destinations`);

  toggle.addEventListener("click", () => toggleGroup(section, toggle));

  places.forEach(({ key, name }) => {
    const buttonFragment = buttonTemplate.content.cloneNode(true);
    const link = buttonFragment.querySelector(".destination-button");
    const icon = buttonFragment.querySelector(".destination-icon");
    const nameText = buttonFragment.querySelector(".destination-name");

    nameText.textContent = name;
    icon.innerHTML = icons[group] || "";
    link.href = buildWorkerUrl(key);
    link.setAttribute("aria-label", `Open Apple Maps directions to ${name}`);

    grid.appendChild(buttonFragment);
  });

  groupsContainer.appendChild(groupFragment);
});
