🧬 Conway's Game of Life – React + TypeScript

Eine moderne Web-Implementierung von John Conways berühmtem zellulären Automaten. Dieses Projekt nutzt React für das UI-Rendering und TypeScript für eine robuste, typsichere Logik.
🚀 Features

    Interaktives Grid: Klicke auf Zellen, um sie manuell wiederzubeleben oder zu töten.

    Simulations-Steuerung: Starten und Pausieren der Evolution in Echtzeit.

    Variable Geschwindigkeit: Wähle zwischen verschiedenen Intervallen (0.1s bis 1s).

    Zufallsgenerator: Erzeuge per Klick ein zufälliges Startmuster.

    Responsives Design: Ein sauberes, dunkles UI für bessere Sichtbarkeit der Zellen.

🛠️ Technische Details

Das Projekt ist modular aufgebaut, um eine klare Trennung zwischen Spiellogik und Darstellung zu gewährleisten:

    GameRules.ts: Enthält den Kern-Algorithmus zur Berechnung der nächsten Generation basierend auf den Nachbarschaftsregeln.

    GameGrid.tsx: Verwaltet den Haupt-State des Spielfelds und nutzt useRef & useCallback für eine flüssige Simulation ohne Memory Leaks.

    Controls.tsx: Eine dedizierte Komponente für die Benutzerinteraktion.

    Cell.tsx: Eine hochperformante Komponente zur Darstellung der einzelnen Zustände.

Die Regeln

    Unterbevölkerung: Jede lebende Zelle mit weniger als zwei lebenden Nachbarn stirbt.

    Fortbestand: Jede lebende Zelle mit zwei oder drei lebenden Nachbarn lebt weiter.

    Überbevölkerung: Jede lebende Zelle mit mehr als drei lebenden Nachbarn stirbt.

    Reproduktion: Jede tote Zelle mit genau drei lebenden Nachbarn wird lebendig.

📦 Installation & Start

    Repository klonen:
    Bash

    git clone https://github.com/dein-nutzername/game-of-life-react.git
    cd game-of-life-react

    Abhängigkeiten installieren:
    Bash

    npm install
    # oder
    yarn install

    Anwendung starten:
    Bash

    npm start
    # oder
    yarn start

🧪 Geplante Erweiterungen

    [ ] Presets: Eine Auswahl an berühmten Mustern (Glider, Gosper Glider Gun).

    [ ] Zoom & Pan: Unterstützung für größere oder unendliche Spielfelder.

    [ ] Generation Counter: Anzeige der aktuellen Evolutionsstufe.

    [ ] Custom Styles: Einstellbare Farben für lebende und tote Zellen.

📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Viel Spaß beim Experimentieren!