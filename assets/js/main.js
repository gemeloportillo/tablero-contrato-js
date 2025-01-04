function detailFormatter(index, row) {
  let html = '';
  switch(row.entidad) {
    case 'Aguascalientes':
      html = $('#detail-aguascalientes').html();
      break;
    case 'Baja California':
      html = $('#detail-baja-california').html();
      break;
    case 'Chiapas':
      html = $('#detail-chiapas').html();
      break;
    default:
      html = `<div><strong>Información adicional:</strong> Sin detalles adicionales disponibles.</div>`;
  }
  return html;
}

function imageFormatter(value, row, index) {
  return `
    <div class="map">
      <img src="/assets/imgs/maps/${row.img}" alt="${row.entidad}">
      <div>${row.entidad}</div>
    </div>
  `;
}

function contratoFormatter(value, row, index) {
  return `
    <div class="contrato">
      <ul>
        <li class="monto">${row.monto}</li>
        <li class="descripcion"><p>${row.descripcion}</p></li>
      </ul>
    </div>
  `;
}

function downloadFormatter(value, row, index) {
  return `
    <div class="btn-group">
      <button class="btn btn-download">JSON</button>
      <button class="btn btn-disabled" disabled>XLS</button>
      <button class="btn btn-disabled" disabled>PDF</button>
    </div>
  `;
}

function changeMenu(icon, entidad) {
  $.getJSON('assets/data/data1.json', function(data) {
    const entidadData = data.find(item => item.entidad.toLowerCase() === entidad.replace(' ', '-'));
    const menus = entidadData.menus;

    // Clear existing menu items
    const menu = $(`#menu-${entidad}`);
    menu.empty();

    // Add new menu items based on the selected icon
    Object.entries(menus).forEach(([key, value]) => {
      menu.append(`<li class="nav-item"><a class="nav-link" href="#" onclick="changeTabContent('${key}', '${entidad}')">${value.title}</a></li>`);
    });

    // Change tab content to the selected icon initially
    changeTabContent(icon, entidad);
  });
}

function initializeMenus() {
  ['aguascalientes', 'baja-california', 'chiapas'].forEach(entidad => {
    changeMenu('parties', entidad);
  });
}

function changeTabContent(icon, entidad) {
  $.getJSON('assets/data/data1.json', function(data) {
    const entidadData = data.find(item => item.entidad.toLowerCase() === entidad.replace(' ', '-'));
    const menuContent = entidadData.menus[icon];

    let tabContent = `
      <h4><img src="/assets/imgs/${menuContent.icon}" alt="Info" style="width: 24px; height: 24px;"> ${menuContent.title}</h4>
      <div class="accordion" id="accordionDetail">
    `;

    menuContent.content.forEach((section, index) => {
      tabContent += `
        <div class="accordion-item">
          <h2 class="accordion-header" id="heading${index}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
              ${section.accordionTitle}
            </button>
          </h2>
          <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionDetail">
            <div class="accordion-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>${icon === 'parties' ? 'Rol' : 'Nombre'}</th>
                    <th>Descripción</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
      `;

      section.rows.forEach(row => {
        tabContent += `
          <tr>
            <td>${row[icon === 'parties' ? 'rol' : 'nombre']}</td>
            <td>${row.descripcion}</td>
            <td>${row.opciones}</td>
          </tr>
        `;
      });

      tabContent += `
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    });

    tabContent += `</div>`;
    $(`#v-pills-tabContent-${entidad}`).html(tabContent);
  });
}

$(document).ready(function() {
  initializeMenus();
});
