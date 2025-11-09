# 🌐 Projet de Load Balancing avec HAProxy et Node.js

## 📖 Objectif

Ce projet a pour but de démontrer les principes fondamentaux de l’équilibrage de charge (load balancing) à l’aide de HAProxy sur un environnement conteneurisé Docker.

L’objectif est de répartir les requêtes HTTP entrantes entre deux serveurs Node.js distincts afin d’assurer :
- une meilleure disponibilité,
- une distribution équilibrée du trafic,
- et une meilleure tolérance aux pannes.

## ⚙️ Architecture du projet

```
.
├── docker-compose.yml
├── Dockerfile
├── haproxy.cfg
├── Makefile
├── nodeServer1.js
└── nodeServer2.js
```

### 🔧 Composants
- 2 serveurs Node.js (`nodeServer1.js` et `nodeServer2.js`) :  
  → Répondent chacun sur un port différent (3000 et 3001).  
- HAProxy :  
  → Fait office d’équilibreur de charge en répartissant les requêtes HTTP entre les deux serveurs.  
- Docker Compose :  
  → Orchestre le lancement de tous les conteneurs.  

## 🧱 Structure Docker

### 🔹 Fichier `Dockerfile`
Ce fichier décrit comment construire l’image Node.js utilisée pour les serveurs :
```Dockerfile
FROM node:22-alpine
WORKDIR /app
COPY . .
CMD ["node", "server1.js"]
```

Chaque conteneur Node exécute une instance du serveur sur un port différent.


## 🌍 Fichier `haproxy.cfg`

```cfg
frontend http-in
    bind *:8080
    default_backend nodes

backend nodes
    balance roundrobin
    option httpchk GET /
    server s1 node1:3000 check
    server s2 node2:3001 check

listen stats
    bind *:8404
    stats enable
    stats uri /
    stats refresh 1s
    stats auth admin:admin
```

HAProxy écoute sur le port `8080` et répartit le trafic entre les serveurs Node (3000 et 3001).  
La page d’administration est disponible sur le port `8404`.

## 🧮 Test de fonctionnement

### Accéder à l’application :
[http://localhost:8080](http://localhost:8080)

En rechargeant plusieurs fois la page, nous verrons alterner :
```
Connexion to server 1
Connexion to server 2
```

Une autre manière de voir les connexions est de génerer des connexions. Il est possible de le faire avec cette commande dans le terminal.

#### PowerShell :
```powershell
for ($i=1; $i -le 100; $i++) {
    $resp = Invoke-WebRequest http://localhost:8080
    Write-Host "$i -> $($resp.Content.Trim())"
}
```

#### Linux :
```bash
for i in {1..100}; do echo -n "$i -> "; curl -s http://localhost:8080; done
```

### Accéder à la page d’administration :
[http://localhost:8404](http://localhost:8404)  

```
username: admin
password: admin
```

Il est possible de voir :
- l’état des backends,
- le nombre de requêtes,
- les statistiques en temps réel.

## 📊 Surveillance HAProxy

Dans le tableau de bord HAProxy (port `8404`), nous pouvons :
- observer les requêtes en direct,
- vérifier l’état des serveurs,
- visualiser le débit et le taux d’erreur.


## 🏁 Conclusion

Ce projet illustre comment :
- configurer HAProxy comme load balancer,
- distribuer le trafic entre plusieurs serveurs Node.js,
- conteneuriser et orchestrer le tout avec Docker,
- surveiller et tester le comportement du système.
