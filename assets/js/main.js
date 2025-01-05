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
  const menus = {
    aguascalientes: {
      ico_parties: ["Información de actores", "Punto de Contacto", "Punto de Contacto Adicional"],
      ico_planning: ["Información de Planeación", "Presupuesto", "Solicitudes de Cotizaciones", "Documentos de planeación", "Hitos de planeación"],
      ico_tender: ["Información de Contratación", "Artículos","Juntas de aclaraciones", "Licitantes","Documentos de contratación", "Hitos de contratación pública", "Modificaciones de contratación pública"],
      ico_awards: ["Información de Adjudicación", "Proveedores", "Artículos", "Documentos de adjudicación", "Modificaciones de adjudicación"],
      ico_contracts: ["Datos generales del contrato", "Artículos del contrato","Garantías", "Documentos","Ejecución", "Hitos", "Modificaciones"],      
    },
    "baja california": { 
      ico_parties: ["Información de actores", "Punto de Contacto", "Punto de Contacto Adicional"],
      ico_planning: ["Información de Planeación", "Presupuesto", "Solicitudes de Cotizaciones", "Documentos de planeación", "Hitos de planeación"],
      ico_tender: ["Información de Contratación", "Artículos","Juntas de aclaraciones", "Licitantes","Documentos de contratación", "Hitos de contratación pública", "Modificaciones de contratación pública"],
      ico_awards: ["Información de Adjudicación", "Proveedores", "Artículos", "Documentos de adjudicación", "Modificaciones de adjudicación"],
      ico_contracts: ["Datos generales del contrato", "Artículos del contrato","Garantías", "Documentos","Ejecución", "Hitos", "Modificaciones"],      
    },
    chiapas: { 
      ico_parties: ["Información de actores", "Punto de Contacto", "Punto de Contacto Adicional"],
      ico_planning: ["Información de Planeación", "Presupuesto", "Solicitudes de Cotizaciones", "Documentos de planeación", "Hitos de planeación"],
      ico_tender: ["Información de Contratación", "Artículos","Juntas de aclaraciones", "Licitantes","Documentos de contratación", "Hitos de contratación pública", "Modificaciones de contratación pública"],
      ico_awards: ["Información de Adjudicación", "Proveedores", "Artículos", "Documentos de adjudicación", "Modificaciones de adjudicación"],
      ico_contracts: ["Datos generales del contrato", "Artículos del contrato","Garantías", "Documentos","Ejecución", "Hitos", "Modificaciones"],      
    }
  };

  // Clear existing menu items
  const menu = $(`#menu-${entidad}`);
  menu.empty();

  // Add new menu items based on the selected icon
  menus[entidad][icon].forEach(item => {
    menu.append(`<li class="nav-item"><a class="nav-link" href="#" onclick="changeTabContent('${item}', '${entidad}')">${item}</a></li>`);
  });
}

function initializeMenus() {
  ['aguascalientes', 'baja-california', 'chiapas'].forEach(entidad => {
    changeMenu('icon1', entidad);
  });
}

function changeTabContent(title, entidad) {
  const tabContent = `
   
    <h4><img src="/assets/imgs/ico_parties.svg" alt="Info" style="width: 24px; height: 24px;"> ${title}</h4>
    <div class="accordion" id="accordionDetail">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            Roles
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionDetail">
          <div class="accordion-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Rol</th>
                  <th>Descripción</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Admin</td>
                  <td>Administrador del sistema</td>
                  <td>Editar, Eliminar</td>
                </tr>
                <tr>
                  <td>Usuario</td>
                  <td>Usuario regular</td>
                  <td>Editar, Eliminar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Miembros
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionDetail">
          <div class="accordion-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Juan Pérez</td>
                  <td>Miembro del equipo</td>
                  <td>Editar, Eliminar</td>
                </tr>
                <tr>
                  <td>Maria López</td>
                  <td>Miembro del equipo</td>
                  <td>Editar, Eliminar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
  $(`#v-pills-tabContent-${entidad}`).html(tabContent);
}

// Call initializeMenus on page load
$(document).ready(function() {
  initializeMenus();
});
