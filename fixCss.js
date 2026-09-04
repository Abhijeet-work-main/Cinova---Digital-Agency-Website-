const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

// 1. Fix CTA Layout
css = css.replace('.diag-fields {\n  display: flex;\n  flex-direction: column;\n  gap: 1.8rem;\n  max-width: 560px;\n  margin: 0 auto;\n  width: 100%;\n  margin-bottom: 3rem;\n}', '.diag-fields {\n  display: flex;\n  flex-direction: column;\n  gap: 1.8rem;\n  max-width: 560px;\n  margin: 0 auto;\n  width: 100%;\n  margin-bottom: 1.5rem;\n}');

css = css.replace('.diag-nav {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 2rem;\n}', '.diag-nav {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 1.5rem;\n}');

// 2. Fix Hero Image layout
css = css.replace('.cinova-hero__image-wrapper {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 60%;\n  height: 100%;\n  z-index: 3;\n}', '.cinova-hero__image-wrapper {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 3;\n}\n.cinova-hero__image {\n  object-fit: cover;\n  object-position: right center;\n}');

fs.writeFileSync('src/app/globals.css', css, 'utf8');
console.log("Updated globals.css via node");
