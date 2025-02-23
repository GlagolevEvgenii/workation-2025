import { data } from './data.js';
// import data from "./data.json" assert { type: "json" };

const preparedData = [];
function prepareData() {
  for (let sheetName in data) {
    const sheetData = data[sheetName];

    const item = {
      land: sheetData['land'],
      breitbandSpeed: +sheetData['breitbandSpeed'],
      mobileSpeed: +sheetData['mobileSpeed'],
      breitbandkosten: +sheetData['breitbandkosten'],
      mietkosten: +sheetData['mietkosten'],
      workingHolidayVisum: sheetData['workingHolidayVisum'],
      happinessIndex: +sheetData['happinessIndex'],
      lgbt: +sheetData['lgbt'],
      globalPeaceIndex: +sheetData['globalPeaceIndex'],
      hauptsaison: +sheetData['hauptsaison'],
      nebensaison: +sheetData['nebensaison'],
      zeitzone: +sheetData['zeitzone'],
      workationScore: +sheetData['workationScore'],
      region: sheetData['region'],
    };
    preparedData.push(item);
  }
}

prepareData();

const table = {
  table: document.querySelector('.table'),
  body: document.querySelector('.table-body'),

  renderArray: [...preparedData],

  previousSorter: document.querySelector("[data-heading='workationScore']"),
  currentSorter: null,
  direction: 'des',
  expanded: false,
  expandButton: document.querySelector('.expand-button'),
  expandGradient: document.querySelector('.table-gradient'),

  init() {
    table.binds();
  },

  binds() {
    document
      .querySelector('.table-head-row')
      .addEventListener('click', table.handleSort);
    let radioInputs = document.querySelectorAll('[name="region"]');
    radioInputs.forEach((el) =>
      el.addEventListener('change', table.handleFilterChange)
    );
    table.expandButton.addEventListener('click', table.expandList);
  },

  expandList(e) {
    table.table.classList.toggle('expanded', !table.expanded);
    table.expandButton.classList.toggle('expanded', !table.expanded);
    table.expandGradient.classList.toggle('expanded', !table.expanded);
    table.expandButton.textContent = table.expanded
      ? 'Weitere Länder anzeigen'
      : 'Weniger Länder anzeigen';
    if (table.expanded) {
      document.querySelector('.table-wrapper').scrollTo({ top: 0 });
    }

    table.expanded = !table.expanded;
    table.render();
    table.styleHeader();
  },

  handleFilterChange(e) {
    if (e.target.value === 'Alle') {
      table.renderArray = [...preparedData];
      if (table.currentSorter != null) {
        table.sort(table.currentSorter.dataset.heading, table.direction);
      }
      table.render();
      return;
    }
    table.renderArray = [...preparedData].filter(
      (el) => el.region === e.target.value
    );
    if (table.currentSorter != null) {
      table.sort(table.currentSorter.dataset.heading, table.direction);
    }

    table.render();
    // document.querySelector(".table-wrapper").scrollIntoView();
  },
  handleSort(e) {
    if (e.target.nodeName !== 'TH') {
      return;
    }
    table.currentSorter = e.target;
    if (table.currentSorter === table.previousSorter) {
      table.direction = table.direction === 'asc' ? 'des' : 'asc';
    }

    table.sort(table.currentSorter.dataset.heading, table.direction);
    table.render();
    table.styleHeader();
    table.previousSorter = table.currentSorter;
  },

  styleHeader() {
    table.expandGradient.classList.remove('expanded');
    const prev = table.previousSorter.dataset.heading;
    const current = table.currentSorter.dataset.heading;

    table.body
      .querySelectorAll(`[data-cell=${prev}]`)
      .forEach((el) => el.classList.remove('active'));
    table.previousSorter.classList.remove('active');

    table.currentSorter.classList.add('active');
    table.body
      .querySelectorAll(`[data-cell=${current}]`)
      .forEach((el) => el.classList.add('active'));

    if (table.direction === 'asc') {
      table.currentSorter.classList.add('asc');
      return;
    }
    table.currentSorter.classList.remove('asc');
  },

  sort(field, direction) {
    if (direction === 'asc') {
      if (typeof table.renderArray[0][field] === 'string') {
        table.renderArray.sort((a, b) => a[field].localeCompare(b[field]));
      }
      table.renderArray.sort((a, b) => {
        return (
          (a[field] < b[field]) - (b[field] < a[field]) ||
          (a.workationScore < b.workationScore) -
            (b.workationScore < a.workationScore) ||
          a.land.localeCompare(b.land)
        );
      });
    } else {
      if (typeof table.renderArray[0][field] === 'string') {
        table.renderArray.sort((a, b) => b[field].localeCompare(a[field]));
      }
      table.renderArray.sort((a, b) => {
        return (
          (b[field] < a[field]) - (a[field] < b[field]) ||
          (a.workationScore < b.workationScore) -
            (b.workationScore < a.workationScore) ||
          a.land.localeCompare(b.land)
        );
      });
    }
  },

  render() {
    table.expandButton.classList.toggle('hide', table.renderArray.length < 10);
    table.body.innerHTML = '';
    let expandedArray = table.expanded
      ? table.renderArray
      : table.renderArray.slice(0, 10);

    let tableRows = expandedArray.map(
      (e, idx) => `<tr class="table-row">
                <td class="text-bold ">${idx + 1}</td>
                <td data-cell="land" class ='table-cell-land'><div class='land-container'><svg class="land-icon" width="16" height="12">
                            <use href="./img/flags.svg#${e.land}"></use>
                        </svg> <span class='land-name'>${e.land.replaceAll(
                          '-',
                          ' '
                        )}</span></div></td>
                <td data-cell="breitbandSpeed" class=" ">${e.breitbandSpeed
                  .toFixed(2)
                  .replace('.', ',')}</td>
                <td data-cell="mobileSpeed" class=" ">${e.mobileSpeed
                  .toString()
                  .replace('.', ',')}</td>
                <td data-cell="breitbandkosten" class=" ">${e.breitbandkosten
                  .toString()
                  .replace('.', ',')} €</td>
                <td data-cell="mietkosten" class=" ">${e.mietkosten
                  .toString()
                  .replace('.', ',')} €</td>
                <td data-cell="workingHolidayVisum" class=" ">${
                  e.workingHolidayVisum
                }</td>
                <td data-cell="happinessIndex" class=" ">${e.happinessIndex
                  .toFixed(2)
                  .replace('.', ',')}</td>
                <td data-cell="lgbt" class=" ">${
                  typeof e.lgbt === 'number'
                    ? e.lgbt.toFixed(2).replace('.', ',')
                    : '—'
                }</td>
                <td data-cell="globalPeaceIndex" class=" ">${e.globalPeaceIndex.toFixed(
                  0
                )}</td>
                <td data-cell="hauptsaison" class=" ">${e.hauptsaison.toFixed(
                  0
                )}</td>
                <td data-cell="nebensaison" class=" ">${e.nebensaison.toFixed(
                  0
                )}</td>
                <td data-cell="zeitzone" class=" ">${e.zeitzone.toFixed(0)}</td>
                <td data-cell="workationScore" class=" ">${e.workationScore.toFixed(
                  0
                )}</td>
              </tr>`
    );

    table.body.insertAdjacentHTML('afterbegin', tableRows.join(''));
  },
};

document.addEventListener('DOMContentLoaded', table.init);
