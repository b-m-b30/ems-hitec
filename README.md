# EmsHitec - Employee Management System

EmsHitec ist ein webbasiertes Employee Management System zur Verwaltung von Mitarbeitern und deren Qualifikationen. Die Anwendung wurde mit Angular 21 entwickelt und nutzt moderne Angular-Features wie Signals, Standalone Components und Signal-basierte Forms. Authentik dient als Identity Provider für die Authentifizierung.

## Inhaltsverzeichnis

- [Voraussetzungen](#voraussetzungen)
- [Lokale Installation und Konfiguration](#lokale-installation-und-konfiguration)
  - [1. Docker-Container starten](#1-docker-container-starten)
  - [2. Authentik-Konfiguration](#2-authentik-konfiguration)
  - [3. Frontend-Anwendung starten](#3-frontend-anwendung-starten)
  - [4. Anmeldung im Frontend](#4-anmeldung-im-frontend)
- [Funktionsübersicht](#funktionsübersicht)
  - [Dashboard](#dashboard)
  - [Mitarbeiterverwaltung](#mitarbeiterverwaltung)
  - [Qualifikationsverwaltung](#qualifikationsverwaltung)
  - [Qualifikationszuweisung](#qualifikationszuweisung)
- [Entwicklung](#entwicklung)
  - [Code-Scaffolding](#code-scaffolding)
  - [Build](#build)
  - [Unit-Tests](#unit-tests)

## Voraussetzungen

- Docker und Docker Compose
- Node.js (Version 18 oder höher)
- npm (Version 11.6.2 oder höher)
- Angular CLI (Version 21.0.0)

## Lokale Installation und Konfiguration

### 1. Docker-Container starten

Starten Sie die erforderlichen Docker-Container für das Backend und Authentik:

```bash
docker compose start
```

Die folgenden Services werden gestartet:
- **Employee API**: `http://localhost:8089`
- **Authentik**: `http://localhost:9000`
- **PostgreSQL-Datenbanken** für Employee Service und Authentik
- **Redis** für Authentik-Session-Management

### 2. Authentik-Konfiguration

#### 2.1 Anmeldung bei Authentik

1. Öffnen Sie einen Browser und navigieren Sie zu `http://localhost:9000`
2. Melden Sie sich mit folgenden Zugangsdaten an:
   - **Benutzername**: `a@b.com`
   - **Passwort**: `secret`

#### 2.2 App-Password erstellen

1. Navigieren Sie in der Authentik-Oberfläche zu **Applications**
2. Suchen Sie den Eintrag **employee_api** und klicken Sie auf **More details**
3. Klicken Sie auf **Edit**
4. Wechseln Sie in der linken Seitenleiste zum Tab **Directory** → **Tokens and App passwords**
5. Klicken Sie auf **Create**
6. Konfigurieren Sie das App-Password wie folgt:
   - **Identifier**: Beliebiger Name (z.B. `john-app-password`)
   - **User**: Wählen Sie **john** aus der Dropdown-Liste
   - **Intent**: Setzen Sie auf **App password**
   - **Expiring**: Deaktivieren Sie die Checkbox
7. Klicken Sie auf **Create**
8. Kopieren Sie das generierte Passwort durch Klick auf den Kopieren-Button rechts neben dem neu erstellten Token

#### 2.3 Passwort in der Anwendung hinterlegen

1. Öffnen Sie die Datei `src/environments/environment.development.ts`
2. Setzen Sie unter login.passwort das Passwort `'secret'` das kopierte App-Password ein:

```typescript
login: {
        username: 'john',
        password: 'IHR_KOPIERTES_APP_PASSWORT',
    },
```

### 3. Frontend-Anwendung starten

Starten Sie den Angular-Entwicklungsserver:

```bash
npm start
```

Alternativ können Sie auch direkt Angular CLI verwenden:

```bash
ng serve
```

Die Anwendung ist nun unter `http://localhost:4200` erreichbar.

### 4. Anmeldung im Frontend

Nach dem Start der Frontend-Anwendung öffnen Sie `http://localhost:4200` im Browser.

#### Option A: SSO-Login (wenn App-Password hinterlegt)

1. Klicken Sie auf **Login mit SSO**
2. Die Anmeldung erfolgt automatisch mit dem in `environment.development.ts` hinterlegten App-Password

#### Option B: Manuelle Anmeldung

1. Klicken Sie auf **Mit Benutzername anmelden**
2. Geben Sie folgende Zugangsdaten ein:
   - **Benutzername**: `john`
   - **Passwort**: Das in Schritt 2.2 kopierte App-Password
3. Klicken Sie auf **Anmelden**

## Funktionsübersicht

### Dashboard

Das Dashboard dient als zentrale Übersichtsseite und bietet schnellen Zugriff auf die Hauptfunktionen:

- **Interaktive Kartenansicht**: 
  - Mitarbeiter-Karte mit Hover-Effekt zur Anzeige aller Mitarbeiter
  - Qualifikations-Karte mit Hover-Effekt zur Anzeige aller Qualifikationen
  - Animierte Rollout-Listen beim Hovern über die Karten
- **Direktnavigation**: Klick auf eine Karte navigiert zur entsprechenden Verwaltungsseite
- **Echtzeit-Datenvorschau**: Aktuelle Mitarbeiter und Qualifikationen werden direkt auf dem Dashboard angezeigt

### Mitarbeiterverwaltung

Die Mitarbeiterverwaltung ermöglicht die vollständige Verwaltung der Mitarbeiterdaten mit modernen Signal-basierten Forms.

#### Funktionen

- **Mitarbeiterübersicht**: Tabellarische Darstellung aller Mitarbeiter mit folgenden Informationen:
  - Vorname und Nachname
  - Stadt
  - Zugewiesene Qualifikationen (alphabetisch sortiert)
  
- **Mitarbeiter erstellen**:
  - Signal-basierte Formularvalidierung in Echtzeit
  - Pflichtfelder: Vorname, Nachname, Stadt
  - Mehrfachauswahl von Qualifikationen mit Chip-Darstellung
  - Dynamische Formularvalidierung mit `computed` Signals

- **Filter- und Suchfunktionen**:
  - Filtern nach Vorname, Nachname oder Stadt
  - Filtern nach spezifischer Qualifikation
  - Kombinierbare Filter für präzise Suche
  - "Filter zurücksetzen"-Funktion

- **Mitarbeiter löschen**: Entfernen einzelner Mitarbeiter über die Lösch-Schaltfläche

- **Automatische Aktualisierung**: Die Mitarbeiterliste wird automatisch alle 30 Sekunden per Polling aktualisiert

- **Sortierte Qualifikationen**: Alle Mitarbeiter-Qualifikationen werden alphabetisch sortiert angezeigt, um ein konsistentes Nutzererlebnis zu gewährleisten

- **Fehlerbehandlung**: Automatische Anzeige und Ausblendung von Fehlermeldungen (5 Sekunden Timeout)

### Qualifikationsverwaltung

Die Qualifikationsverwaltung ermöglicht die Pflege des Skill-Portfolios des Unternehmens mit modernen UI-Komponenten.

#### Funktionen

- **Qualifikationsübersicht**: Liste aller verfügbaren Qualifikationen mit:
  - Checkbox für Mehrfachauswahl
  - Bezeichnung (Skill-Name)
  - Aktionen (Bearbeiten/Löschen)

- **Qualifikation hinzufügen**:
  - Klick auf **Qualifikation hinzufügen** öffnet ein modales Formular
  - Eingabe der Qualifikationsbezeichnung (Pflichtfeld)
  - Bestätigung über **Qualifikation erstellen**

- **Qualifikation bearbeiten**:
  - Bearbeiten-Button öffnet ein visuell optimiertes Modal
  - Inline-Bearbeitung der Qualifikationsbezeichnung
  - Konsistentes Design mit dem Rest der Anwendung

- **JSON-Import**:
  - Import einzelner Qualifikationen: `{"skill": "Projektmanager"}`
  - Import mehrerer Qualifikationen: `[{"skill": "Skill1"}, {"skill": "Skill2"}]`
  - Automatische Validierung des JSON-Formats

- **Mehrfachauswahl und Batch-Operationen**: 
  - Auswahl mehrerer Qualifikationen über Checkboxen
  - Batch-Löschung über **Ausgewählte Qualifikationen löschen**

- **Filterung**: 
  - Echtzeit-Durchsuchen der Qualifikationsliste
  - "Filter zurücksetzen"-Funktion für schnellen Reset

- **Automatische Aktualisierung**: Polling-basierte Aktualisierung der Qualifikationsliste

### Qualifikationszuweisung

Die Qualifikationszuweisungsansicht ermöglicht die Verknüpfung von Mitarbeitern mit Qualifikationen.

#### Funktionen

- **Mitarbeiterauswahl**: 
  - Dropdown-Menü mit allen verfügbaren Mitarbeitern
  - Anzeige von Vor- und Nachname

- **Verfügbare Qualifikationen**:
  - Liste aller Qualifikationen, die dem Mitarbeiter noch nicht zugewiesen sind
  - Zuweisung durch Klick auf die jeweilige Qualifikation

- **Zugewiesene Qualifikationen**:
  - Liste aller dem Mitarbeiter bereits zugewiesenen Qualifikationen
  - Entfernung durch Klick auf die jeweilige Qualifikation

- **Testdaten erstellen**:
  - Schnellerstellung eines Test-Mitarbeiters (Max Mustermann)
  - Nützlich für Entwicklung und Demonstration

- **Dynamische Aktualisierung**: Änderungen werden sofort in beiden Listen reflektiert

## Entwicklung

### Technologie-Stack

- **Angular 21**: Moderne Web-Framework mit Signals und Standalone Components
- **TypeScript**: Typ-sichere Entwicklung
- **RxJS**: Reaktive Programmierung für asynchrone Operationen
- **Signal Forms**: Moderne, signal-basierte Formularimplementierung ohne Reactive Forms
- **Standalone Components**: Modulfreie Architektur für bessere Performance
- **Change Detection OnPush**: Optimierte Performance durch gezielte Change Detection

### Architektur-Highlights

- **Signals für State Management**: Nutzung von `signal()`, `computed()` und `effect()` für reaktive Datenverwaltung
- **Stores**: Zentrale State-Verwaltung mit `EmployeeStore` und `QualificationsStore`
- **Dependency Injection**: Moderne `inject()` Funktion statt Constructor Injection
- **Environment Configuration**: Konfigurierbare API-URLs und Einstellungen über Environment-Files
- **Responsive Design**: Mobile-first Ansatz mit modernem CSS

### Code-Scaffolding

Angular CLI bietet leistungsstarke Code-Generierung. Zum Erstellen einer neuen Komponente:

```bash
ng generate component component-name
```

Für eine vollständige Liste verfügbarer Schematics:

```bash
ng generate --help
```

### Build

Erstellen eines Production-Builds:

```bash
ng build
```

Die Build-Artefakte werden im Verzeichnis `dist/` gespeichert. Der Production-Build ist optimiert für Performance und Geschwindigkeit.

### Unit-Tests

Ausführen der Unit-Tests mit Vitest:

```bash
ng test
```

Die Tests nutzen das Vitest-Framework für schnelle und zuverlässige Unit-Tests.

### Best Practices

- **Signals verwenden**: Bevorzugt `signal()`, `computed()` und `effect()` für State Management
- **Standalone Components**: Alle Components sind standalone (kein `NgModule` erforderlich)
- **Change Detection OnPush**: Optimierte Performance durch `ChangeDetectionStrategy.OnPush`
- **Modern Control Flow**: Verwendung von `@if`, `@for`, `@switch` statt `*ngIf`, `*ngFor`
- **inject() statt Constructor Injection**: Moderne Dependency Injection
- **Type Safety**: Strikte TypeScript-Konfiguration für maximale Typsicherheit

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
