# Carpeta de Componentes

La carpeta `components` contiene todos los componentes de la aplicación, organizados de manera modular para facilitar su reutilización y mantenimiento. A continuación, se describe la estructura y propósito de los subdirectorios:

## Estructura

- **`common/`**: Contiene componentes reutilizables que pueden ser utilizados en diferentes partes de la aplicación, como `Avatar`, `Header` y `Notification`.
- **`features/`**: Contiene componentes específicos de funcionalidades o dominios, organizados por características como `auth` y `quiz`.

## Propósito

- **Reutilización**: Los componentes en `common/` están diseñados para ser genéricos y reutilizables en múltiples vistas o características.
- **Modularidad**: Los componentes específicos de dominio están organizados en `features/` para mantener una separación clara de responsabilidades.

## Notas

- Cada componente tiene su propio archivo de estilos (si aplica) y pruebas unitarias.
- Las rutas de importación están centralizadas en `components/index.js` para facilitar el acceso a los componentes desde otras partes de la aplicación.