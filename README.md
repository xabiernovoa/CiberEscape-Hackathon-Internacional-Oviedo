# CiberEscape: La Amenaza Invisible


> **Democratizando la seguridad digital a través de la gamificación.**

**CyberEscape** es una propuesta de aplicación móvil que enseña ciberseguridad mediante mecánicas de *Escape Room Digital*. A diferencia de los cursos tradicionales o plataformas técnicas especializadas, CyberEscape ofrece una experiencia inmersiva, narrativa y visualmente atractiva diseñada para jóvenes y el público general.

---

## Concepto y Visión

El objetivo principal es transformar el aprendizaje de la seguridad digital en algo adictivo y accesible. El usuario no "estudia", sino que juega, detecta y resuelve problemas en entornos simulados seguros.

La aplicación se estructura en torno a la **detección, análisis y resolución** de vulnerabilidades cotidianas, aumentando la dificultad progresivamente para desarrollar el "sentido arácnido" digital del usuario.

---

## Modos de Juego

### Modo Historia (Escape Rooms)
El núcleo de la experiencia. Cada nivel es una **sala virtual** que simula una amenaza real o una vulnerabilidad específica.
*   **Mecánica:** El usuario debe interactuar con el entorno para detectar fallos de seguridad (contraseñas en post-its, redes Wi-Fi falsas, QR maliciosos).
*   **Progresión:** Los niveles aumentan de complejidad conforme el usuario avanza.
*   **Guía Interactiva:** Al inicio de cada problema se incluyen pequeñas guías de actuación paso a paso y feedback inmediato tras cada decisión.

### Modo Competición (Online)
Un entorno social diseñado para el aula o grupos de amigos.
*   **Retos Grupales:** Los jugadores pueden formar equipos para resolver baterías de preguntas y escenarios de ciberseguridad.
*   **Leaderboards:** Sistema de clasificación en tiempo real que puede filtrarse por nivel global, país o rango de edad, fomentando la competitividad sana y el aprendizaje colaborativo.

### Modo Arcade
Entrenamiento intensivo para perfeccionar habilidades.
*   Permite al usuario **repetir las Escape Rooms** que ya ha desbloqueado en el modo historia.
*   Ideal para mejorar tiempos de resolución y asentar los conocimientos adquiridos sin la presión de la narrativa principal.

### Centro de Recursos
Un espacio dedicado a la prevención y la información oficial.
*   Acceso directo a recursos recomendados.
*   Integración con servicios de ayuda como el **017 de INCIBE** y diccionarios de terminología (Phishing, Ransomware, etc.).

---


## Instalación y Despliegue Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1.  **Instalar dependencias**
    ```bash
    npm install
    # o
    yarn install
    ```

2.  **Ejecutar servidor de desarrollo**
    ```bash
    npm run dev
    ```
    Abre tu navegador en `http://localhost:5173`.

---

##  Estructura del Proyecto

```text
src/
├── components/
│   ├── levels/       # Lógica de cada Escape Room (Niveles 1-5)
│   ├── screens/      # Pantallas principales (Hub, Arcade, Online, Recursos)
│   └── ui/           # Componentes de interfaz (Navbar, Modales, Botones)
├── constants.ts      # Configuración global, textos de niveles y rangos
├── types.ts          # Definiciones de tipos TypeScript
├── App.tsx           # Enrutador principal y gestión de estado global
└── index.css         # Estilos globales y tema visual
```

## Imagenes del proyecto

<img width="2235" height="1325" alt="Captura de pantalla do 2025-11-21 22-43-15" src="https://github.com/user-attachments/assets/c8f1c4eb-9af3-4d8b-af9f-666dbc82a6bf" />
<img width="2235" height="1325" alt="Captura de pantalla do 2025-11-21 22-42-24" src="https://github.com/user-attachments/assets/6fa7947c-b2df-4f30-b472-4a9e838ee2b0" />
<img width="2235" height="1325" alt="Captura de pantalla do 2025-11-21 22-42-35" src="https://github.com/user-attachments/assets/4d7c7b88-e05e-4311-a9e4-655741dfacd9" />
<img width="2235" height="1325" alt="Captura de pantalla do 2025-11-21 22-42-39" src="https://github.com/user-attachments/assets/0ec7deed-81bc-491b-a3b5-30916b711266" />
<img width="2235" height="1325" alt="Captura de pantalla do 2025-11-21 22-42-47" src="https://github.com/user-attachments/assets/ff338ba3-9112-437e-8221-8eda19d73530" />
<img width="2235" height="1325" alt="Captura de pantalla do 2025-11-21 22-43-01" src="https://github.com/user-attachments/assets/d4e0a24e-206d-4b07-9a98-43c1f1f25569" />

