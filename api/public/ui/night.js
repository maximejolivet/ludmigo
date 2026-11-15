// Bascule du mode soirée, mémorisée comme dans le back office (clé ludmigo.admin.night)
// Evening mode switch, remembered as in the back office (key ludmigo.admin.night)
(function () {
  var KEY = 'ludmigo.admin.night';
  var root = document.documentElement;
  var button = document.getElementById('night-toggle');
  if (!button) return;

  // Le thème sombre intégré de Swagger UI (classe dark-mode) est écarté : seul le mode soirée de Ludmigo s'applique
  // The built-in Swagger UI dark theme (dark-mode class) is dropped: only Ludmigo's evening mode applies
  function dropSwaggerDarkMode() {
    if (root.classList.contains('dark-mode')) root.classList.remove('dark-mode');
  }
  dropSwaggerDarkMode();
  new MutationObserver(dropSwaggerDarkMode).observe(root, { attributes: true, attributeFilter: ['class'] });

  function sync() {
    button.setAttribute('aria-pressed', root.classList.contains('night') ? 'true' : 'false');
  }

  button.addEventListener('click', function () {
    var night = root.classList.toggle('night');
    try {
      localStorage.setItem(KEY, night ? '1' : '0');
    } catch (e) {
      // Le choix ne sera pas mémorisé, mais le thème change quand même / Not remembered, but the theme still changes
    }
    sync();
  });
  sync();
})();
