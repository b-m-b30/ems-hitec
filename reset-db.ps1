# Stoppt die Container und entfernt Volumes (Datenbanken werden gelöscht)
docker compose down -v

# Startet die Container neu
docker compose up -d

Write-Host "----------------------------------------------------------------"
Write-Host "Services wurden neu gestartet und Datenbanken zurückgesetzt."
Write-Host "Das Backend (Employee Service) benötigt ca. 30-60 Sekunden zum Starten."
Write-Host "----------------------------------------------------------------"
