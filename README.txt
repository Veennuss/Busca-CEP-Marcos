BUSCACEP CLOUD - DOIS SERVIDORES

Arquitetura:
Frontend (porta 3001) -> Backend (porta 3000) -> ViaCEP

1) BACKEND
Abra um terminal:
cd backend
npm install
npm start

Backend: http://localhost:3000
Teste: http://localhost:3000/api/ceps/13484320

2) FRONTEND
Abra outro terminal:
cd frontend
npm install
npm start

Frontend: http://localhost:3001

IMPORTANTE:
Os dois servidores devem ficar rodando ao mesmo tempo.
O frontend NÃO consulta o ViaCEP diretamente.
