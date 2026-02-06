# EmsHitec - Employee Management System

EmsHitec ist ein webbasiertes Employee Management System zur Verwaltung von Mitarbeitern und deren Qualifikationen. Die Anwendung wurde mit Angular 21 entwickelt und nutzt Authentik als Identity Provider für die Authentifizierung.

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

1. Öffnen Sie die Datei `src/app/login/login.ts`
2. Ersetzen Sie in Zeile 32 das Passwort `'secret'` durch das kopierte App-Password:

```typescript
this.authService.createToken('john', 'IHR-KOPIERTES-PASSWORT').subscribe({
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
2. Die Anmeldung erfolgt automatisch mit dem in `login.ts` hinterlegten App-Password

#### Option B: Manuelle Anmeldung

1. Klicken Sie auf **Mit Benutzername anmelden**
2. Geben Sie folgende Zugangsdaten ein:
   - **Benutzername**: `john`
   - **Passwort**: Das in Schritt 2.2 kopierte App-Password
3. Klicken Sie auf **Anmelden**

## Funktionsübersicht

### Dashboard

Das Dashboard dient als zentrale Übersichtsseite und bietet schnellen Zugriff auf die Hauptfunktionen:

- **Mitarbeiter**: Direkte Navigation zur Mitarbeiterverwaltung
- **Qualifikationen**: Zugriff auf die Qualifikationsverwaltung
- **Zuweisungen**: Öffnet die Qualifikationszuweisungsansicht

### Mitarbeiterverwaltung

Die Mitarbeiterverwaltung ermöglicht die vollständige Verwaltung der Mitarbeiterdaten.

#### Funktionen

- **Mitarbeiterübersicht**: Tabellarische Darstellung aller Mitarbeiter mit folgenden Informationen:
  - ID
  - Vorname
  - Nachname
  - Straße
  - Postleitzahl
  - Stadt
  - Telefonnummer
  - Zugewiesene Qualifikationen (Skill-IDs)

- **Mitarbeiter auswählen**: Auswahl eines Mitarbeiters durch Klick auf eine Tabellenzeile

- **Mitarbeiter löschen**: Entfernen einzelner Mitarbeiter über die Lösch-Schaltfläche

- **Automatische Aktualisierung**: Die Mitarbeiterliste wird automatisch per Polling aktualisiert, um Änderungen in Echtzeit anzuzeigen

- **Fehlerbehandlung**: Anzeige von Fehlermeldungen bei Verbindungsproblemen oder fehlgeschlagenen Operationen

### Qualifikationsverwaltung

Die Qualifikationsverwaltung ermöglicht die Pflege des Skill-Portfolios des Unternehmens.

#### Funktionen

- **Qualifikationsübersicht**: Liste aller verfügbaren Qualifikationen mit:
  - ID
  - Bezeichnung (Skill-Name)

- **Qualifikation hinzufügen**:
  - Klick auf **Qualifikation hinzufügen** öffnet ein Modal
  - Eingabe der Qualifikationsbezeichnung (Pflichtfeld)
  - Bestätigung über **Qualifikation erstellen**

- **JSON-Import**:
  - Import einzelner Qualifikationen: `{"skill": "Projektmanager"}`
  - Import mehrerer Qualifikationen: `[{"skill": "Skill1"}, {"skill": "Skill2"}]`
  - Automatische Validierung des JSON-Formats

- **Qualifikationen auswählen**: Mehrfachauswahl über Checkboxen

- **Qualifikationen löschen**: 
  - Auswahl mehrerer Qualifikationen
  - Batch-Löschung über **Ausgewählte Qualifikationen löschen**

- **Filterung**: Durchsuchen der Qualifikationsliste nach spezifischen Skills

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

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
