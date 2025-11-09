
sendRequests:
	for ($i=1; $i -le 50; $i++) {
		$resp = Invoke-WebRequest http://localhost:8080
		Write-Host "$i -> $($resp.Content.Trim())"
	}
